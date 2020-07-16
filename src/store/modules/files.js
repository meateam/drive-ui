import * as filesApi from "@/api/files";
import { sortFiles } from "@/utils/sortFiles";
import { fileTypes } from "@/config";
import { formatFile } from "@/utils/formatFile";
import { isFileNameExists } from "@/utils/isFileNameExists";
import router from "../../router";

const state = {
  files: [],
  chosenFiles: [],
  currentFolderHierarchy: [],
  currentFolder: undefined,
};

const getters = {
  files: (state) => sortFiles(state.files),
  chosenFiles: (state) => state.chosenFiles,
  folderRoles: (state) => state.folderRoles,
  currentFolder: (state) => state.currentFolder,
  folders: (state) =>
    state.files.filter((file) => file.type === fileTypes.folder),
  currentFolderHierarchy: (state) => state.currentFolderHierarchy,
};

const actions = {
  async fetchFiles({ commit, dispatch }) {
    try {
      const files = await filesApi.fetchFiles(state.currentFolder);
      Promise.all(
        files.map((file) => {
          return formatFile(file);
        })
      );
      commit("setFiles", files);
    } catch (err) {
      dispatch("onError", err);
    }
  },
  /**
   * fetchSharedFiles fetch the shared files in the root folder
   */
  async fetchSharedFiles({ commit, dispatch }) {
    try {
      let files = await filesApi.fetchSharedFiles(state.currentFolder);
      files = files.filter(file => !file.isExternal)
      commit("setFiles", await Promise.all(
        files.map((file) => {
          return formatFile(file);
        })
      ));
    } catch (err) {
      dispatch("onError", err);
    }
  },
  async fetchExternalTransferdFiles({ commit, dispatch }) {
    try {
      let files = await filesApi.fetchSharedFiles(state.currentFolder);
      files = files.filter(file => file.isExternal)
      commit("setFiles", await Promise.all(
        files.map((file) => {
          return formatFile(file);
        })
      ));
    } catch (err) {
      dispatch("onError", err);
    }
  },
  /**
   * fetchLastUpdatedFiles fetch all the files that where updated today in the current folder
   */
  async fetchLastUpdatedFiles({ commit, dispatch }) {
    try {
      const files = await filesApi.fetchFiles();
      const lastUpdatedFiles = files.filter((file) => {
        return (
          new Date(file.updatedAt).toDateString() === new Date().toDateString()
        );
      });
      commit("setFiles", await Promise.all(
        lastUpdatedFiles.map((file) => {
          return formatFile(file);
        })
      ));
    } catch (err) {
      dispatch("onError", err);
    }
  },
  /**
   * deleteFile gets a file id and delete it
   * @param fileID is the id of the file to delete
   */
  async deleteFile({ commit, dispatch }, fileID) {
    await filesApi.deleteFile(fileID);
    commit("deleteFile", fileID);
    dispatch("getQuota");
  },
  /**
   * deleteFiles uses the method delete file to delete all the files in the chosen array
   */
  deleteFiles({ dispatch, commit }, files) {
    Promise.all(
      files.map((file) => dispatch("deleteFile", file.id))
    ).then(() => {
      commit('onSuccess', files.length === 1 ? "success.DeleteItem" : "success.DeleteItems");
    }).catch(err => {
      dispatch("onError", err);
    })
  },
  /**
   * uploadFile create multipart or resumable upload by the file size
   * @param file is the file to upload
   */
  async uploadFile({ commit }, file) {

    if (isFileNameExists({ name: file.name, files: state.files }))
      throw new Error("שם הקובץ קים בתיקייה");

    let metadata = undefined;

    if (file.size <= 5 << 20) {
      metadata = await filesApi.multipartUpload({ file, parent: state.currentFolder });
    } else {
      metadata = await filesApi.resumableUpload({ file, parent: state.currentFolder });
    }

    const formatedFile = await formatFile(metadata);

    commit("removeLoadingFile", formatedFile.name);
    commit("addFile", formatedFile);

    commit("addQuota", metadata.size);

  },
  /**
   * uploadFiles uploads all the files async
   * @param files is the files to upload
   */
  async uploadFiles({ dispatch, commit }, files) {
    return Promise.all(
      Object.values(files).map((file) => {
        return dispatch("uploadFile", file);
      })
    )
      .then(() => commit("onSuccess", files.length === 1 ? "success.File" : "success.Files"))
      .catch(err => {
        dispatch("onError", err);
      });
  },
  async cancelUpload({ commit, dispatch }, file) {
    try {
      await filesApi.cancelUpload(file.source);
      commit("removeLoadingFile", file.name);
      dispatch("onSuccess", "Cancel")
    } catch (err) {
      dispatch("onError", err);
    }

  },
  /**
   * uploadFolder in the current folder
   * @param name is the name of the folder
   */
  async uploadFolder({ commit, dispatch }, name) {
    try {
      if (isFileNameExists({ name, files: state.files }))
        throw new Error("שם התיקייה כבר קיים בתיקייה הנוכחית");
      const folder = await filesApi.uploadFolder({ name, parent: state.currentFolder });
      const formatedFile = await formatFile(folder);
      commit("onSuccess", "success.Folder");
      commit("addFile", formatedFile);
    } catch (err) {
      dispatch("onError", err);
    }
  },
  /**
   * onFolderChange change the current folder by the recived id
   * @param folderID is the id of the current folder
   */
  async onFolderChange({ dispatch, commit }, folderID) {
    try {
      if (!folderID) {
        commit("setCurrentFolder", undefined);
        commit("setHierarchy", []);
      } else {
        const folder = await filesApi.getFileByID(folderID);
        commit("setCurrentFolder", folder);
        dispatch("getAncestors", folder.id);
      }
    } catch (err) {
      router.push("/404")
    }
  },
  async getAncestors({ commit }, folderID) {
    const breadcrumbs = await filesApi.getFolderHierarchy(folderID);
    commit("setHierarchy", breadcrumbs);
  },
  async editFile({ commit, dispatch }, { file, name }) {
    try {
      const newName = file.name.includes('.') ? `${name}.${file.name.substr(file.name.lastIndexOf(".") + 1)}` : name;
      const res = await filesApi.editFile({ file, name: newName })
      commit("onFileRename", res);
      commit("onSuccess", "success.Edit");
    } catch (err) {
      dispatch("onError", err);
    }
  },
  async moveFile({ commit, dispatch }, { folderID, fileIDs }) {
    try {
      await filesApi.moveFile({ folderID, fileIDs })
      fileIDs.forEach((fileID) => {
        commit("deleteFile", fileID);
      });
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

const mutations = {
  setFiles: (state, files) => (state.files = files),
  deleteFile: (state, fileID) => {
    state.files = state.files.filter((file) => file.id !== fileID);
    state.chosenFiles = state.chosenFiles.filter((file) => {
      return file.id !== fileID;
    });
  },
  onFileRename: (state, { name, file }) => {
    if (state.files.includes(file)) {
      state.files.forEach((item) => {
        if (file === item) item.name = name;
      });
    }
  },
  addFile: (state, file) => {
    if (
      state.currentFolder === file.parent ||
      state.currentFolder.id === file.parent
    ) {
      state.files.push(file);
    }
  },
  onFileChoose: (state, { isChecked, file }) => {
    if (isChecked && !state.chosenFiles.includes(file)) {
      state.chosenFiles.push(file);
    } else if (isChecked) {
      return;
    } else {
      state.chosenFiles = state.chosenFiles.filter((chosenFile) => {
        return chosenFile !== file;
      });
    }
  },
  onFilesSelect: (state, files) => {
    state.chosenFiles = files;
  },
  clearSelectedFiles: (state) => {
    state.chosenFiles = [];
  },
  setCurrentFolder: (state, folder) => {
    state.currentFolder = folder;
    state.chosenFiles = [];
    state.files = [];
  },
  setHierarchy: (state, hieratchy) => {
    state.currentFolderHierarchy = hieratchy;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
