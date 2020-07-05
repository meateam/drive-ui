import * as filesApi from "@/api/files";
import { formatFile } from "@/utils/formatFile";
import { isFileNameExists } from "@/utils/isFileNameExists";

const state = {
  allowedTypes: [
    "png",
    "xlsx",
    "docx",
    "jpg",
    "pptx",
    "txt",
    "jpeg",
    "mp4",
    "mpg",
    "mpeg",
    "bmp",
    "gif",
    "wav",
    "wave",
    "pdf",
  ],
  files: [],
  chosenFiles: [],
  folderContentType: "application/vnd.drive.folder",
  currentFolder: undefined,
  currentFolderHierarchy: [],
};

const getters = {
  allowedFileTypes: (state) => state.allowedTypes,
  files: (state) => state.files,
  folderContentType: (state) => state.folderContentType,
  chosenFiles: (state) => state.chosenFiles,
  folderRoles: (state) => state.folderRoles,
  currentFolder: (state) => state.currentFolder,
  folders: (state) =>
    state.files.filter((file) => file.type === state.folderContentType),
  currentFolderHierarchy: (state) => state.currentFolderHierarchy,
};

const actions = {
  async fetchFiles({ commit }) {
    try {
      const files = await filesApi.fetchFiles(state.currentFolder);
      Promise.all(
        files.map((file) => {
          return formatFile(file);
        })
      );
      commit("fetchFiles", files);
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * fetchSharedFiles fetch all the shared files in the current folder
   */
  async fetchSharedFiles({ commit }) {
    try {
      const files = filesApi.fetchSharedFiles(state.currentFolder);
      Promise.all(
        files.map((file) => {
          return formatFile(file);
        })
      );
      commit("fetchFiles", files);
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * fetchLastUpdatedFiles fetch all the files that where updated today in the current folder
   */
  async fetchLastUpdatedFiles({ commit }) {
    try {
      const files = await filesApi.fetchFiles();
      const lastUpdatedFiles = files.filter((file) => {
        return (
          new Date(file.updatedAt).toDateString() === new Date().toDateString()
        );
      });
      Promise.all(
        lastUpdatedFiles.map((file) => {
          return formatFile(file);
        })
      );
      commit("fetchFiles", files);
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * deleteFile gets a file id and delete it
   * @param fileID is the id of the file to delete
   */
  async deleteFile({ commit, dispatch }, fileID) {
    try {
      const file = await filesApi.deleteFile(fileID);
      commit("deleteFile", file);
      dispatch("getQuota");
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * deleteFiles uses the method delete file to delete all the files in the chosen array
   */
  deleteFiles({ dispatch }, files) {
    Promise.all(
      files.map(async (file) => {
        await dispatch("deleteFile", file.id);
      })
    );
  },
  /**
   * uploadFile create multipart or resumable upload by the file size
   * @param file is the file to upload
   */
  async uploadFile({ dispatch }, file) {
    if (isFileNameExists({ name: file.name, files: state.files }))
      throw new Error("Name already exists in the root");
    if (file.size <= 5 << 20) {
      await dispatch("multipartUpload", file);
    } else {
      await dispatch("resumableUpload", file);
    }
  },
  /**
   * uploadFiles uploads all the files async
   * @param files is the files to upload
   */
  async uploadFiles({ dispatch }, files) {
    Promise.all(
      Object.values(files).map((file) => {
        dispatch("uploadFile", file);
      })
    );
  },
  /**
   * multipartUpload create an upload with small size
   * @param file is the file that was chose by the user in the type blob
   */
  async multipartUpload({ dispatch, commit }, file) {
    try {
      const metadata = await filesApi.multipartUpload({ file, parent: state.currentFolder });
      const formatedFile = await formatFile(metadata);
      commit("addFile", formatedFile);
      dispatch("getQuota");
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * resumableUpload is an upload for bigger files
   * @param file is the file to upload
   */
  async resumableUpload({ dispatch, commit }, file) {
    try {
      const metadata = await filesApi.resumableUpload({ file, parent: state.currentFolder });
      const formatedFile = await formatFile(metadata);
      commit("addFile", formatedFile);
      dispatch("getQuota");
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * uploadFolder in the current folder
   * @param name is the name of the folder
   */
  async uploadFolder({ commit }, name) {
    try {
      if (isFileNameExists({ name, files: state.files }))
        throw new Error("Name already exists in the root");
      const folder = await filesApi.uploadFolder({ name, parent: state.currentFolder });
      const formatedFile = await formatFile(folder);
      commit("addFile", formatedFile);
    } catch (err) {
      throw new Error(err);
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
      throw new Error(err);
    }
  },
  async getAncestors({ commit }, folderID) {
    const breadcrumbs = await filesApi.getFolderHierarchy(folderID);
    commit("setHierarchy", breadcrumbs);
  },
  async editFile({ commit }, { file, name }) {
    try {
      const res = await filesApi.editFile({ file, name })
      commit("onFileRename", res);
    } catch (err) {
      throw new Error(err);
    }
  },
  async moveFile({ commit }, { folderID, fileIDs }) {
    try {
      await filesApi.moveFile({ folderID, fileIDs })
      fileIDs.forEach((fileID) => {
        commit("deleteFile", fileID);
      });
    } catch (err) {
      throw new Error(err);
    }
  },
};

const mutations = {
  fetchFiles: (state, files) => (state.files = files),
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
  setCurrentFolder: (state, folder) => {
    state.currentFolder = folder;
    state.chosenFiles = [];
    state.files = [];
  },
  onUserShare: (state, { fileID, user }) => {
    state.files.map((file) => {
      if (file.id === fileID) file.permissions.push(user);
    });
  },
  onExternalUserShare: (state, { fileID, user }) => {
    state.files.map((file) => {
      if (file.id === fileID) file.permits.push(user);
    });
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
