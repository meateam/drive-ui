import * as filesApi from "@/api/files";
import * as lastUpdatedFileHandler from "@/utils/lastUpdatedFileHandler";
import { sortFiles } from "@/utils/sortFiles";
import { fileTypes } from "@/config";
import { isOwner } from "@/utils/isOwner";
import { getDestinationByAppId } from "@/utils/formatDestination";
import {
  isFileOwner,
  getFileOwnerName,
  getExternalFileOwnerName,
} from "@/utils/formatFile";
import { isFileNameExists } from "@/utils/isFileNameExists";
import router from "@/router";

const state = {
  files: [],
  chosenFiles: [],
  currentFolderHierarchy: [],
  pageNum: 1,
  currentFolder: undefined,
  serverFilesLength: undefined,
};

const getters = {
  files: (state) => sortFiles(state.files),
  serverFilesLength: (state) => state.serverFilesLength,
  pageNum: (state) => state.pageNum,
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

      commit("setFiles", files);

      files.forEach(async (file) => {
        const formattedFile = file;
        const isOwner = isFileOwner(file.ownerId);
        formattedFile.owner = isOwner ? "אני" : await getFileOwnerName(file.ownerId);
        commit('updateFile', formattedFile);
      });
    } catch (err) {
      dispatch("onError", err);
    }
  },
  /**
   * fetchSharedFiles fetch the shared files in the root folder
   */
  async fetchSharedFiles({ commit, dispatch }, pageNum) {
    try {
      const permissions = await filesApi.fetchSharedFiles(pageNum || 0);
      const files = permissions.files;

      commit("updatePageNum", pageNum + 1)
      commit("setFiles", files);
      commit("setServerFilesLength", permissions.itemCount);

      for (const file of files) {
        const formattedFile = file;
        formattedFile.owner = await getFileOwnerName(file.ownerId);
        commit("updateFile", formattedFile);
      }
    } catch (err) {
      dispatch("onError", err);
    }
  },
  async fetchExternalTransferdFiles({ commit, dispatch }, pageNum, appId) {
    try {
      const permissions = await filesApi.fetchExternalTransferdFiles(pageNum || 0, appId);
      const files = permissions.files;
      const dest = getDestinationByAppId(appId)
      commit("setFiles", files);
      commit("setServerFilesLength", permissions.itemCount);

      for (const file of files) {
        const formattedFile = file;
        formattedFile.owner = await getExternalFileOwnerName(file.ownerId, dest);
        commit("updateFile", formattedFile);
      }
    } catch (err) {
      dispatch("onError", err);
    }
  },
  /**
   * fetchLastUpdatedFiles fetch all the files that where updated today in the current folder
   */
  async fetchLastUpdatedFiles({ commit, dispatch }) {
    try {
      const files = await lastUpdatedFileHandler.getUpdatedFiles();

      commit("setFiles", files);

      files.forEach(async (file) => {
        const formattedFile = file;
        const isOwner = isFileOwner(file.ownerId);

        formattedFile.owner = isOwner ? "אני" : await getFileOwnerName(file.ownerId);
        commit("updateFile", formattedFile);
      });
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
    Promise.all(files.map((file) => dispatch("deleteFile", file.id)))
      .then(() => {
        commit(
          "onSuccess",
          files.length === 1 ? "success.DeleteItem" : "success.DeleteItems"
        );
      })
      .catch((err) => {
        dispatch("onError", err);
      });
  },
  removePermissions({ dispatch, commit }, files) {
    Promise.all(files.map(async (file) => {
      await filesApi.deleteFile(file.id)
      commit("deleteFile", file.id);
    }))
      .then(() => {
        commit('updatePageNum', 1);
        dispatch("getQuota");
        commit(
          "onSuccess",
          files.length === 1 ? "success.DeleteItem" : "success.DeleteItems"
        );
      })
      .catch((err) => {
        dispatch("onError", err);
      });
  },
  /**
   * uploadFile create multipart or resumable upload by the file size
   * @param file is the file to upload
   */
  async uploadFile({ commit, rootState }, file) {
    if (
      isFileNameExists({
        name: file.name,
        files: state.files,
        loadingFiles: rootState.loading.loadingFiles,
      })
    )
      throw new Error("שם הקובץ קים בתיקייה");

    let metadata = undefined;

    if (file.size <= 5 << 20) {
      metadata = await filesApi.multipartUpload({
        file: file,
        parent: state.currentFolder,
      });
    } else {
      metadata = await filesApi.resumableUpload({
        file: file,
        parent: state.currentFolder,
      });
    }

    metadata.owner = "אני";
    lastUpdatedFileHandler.pushUpdatedFile(metadata.id);

    commit("removeLoadingFile", metadata.name);
    commit("addFile", metadata);

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
      .then(() =>
        commit(
          "onSuccess",
          files.length === 1 ? "success.File" : "success.Files"
        )
      )
      .catch((err) => {
        dispatch("onError", err);
      });
  },
  async cancelUpload({ commit, dispatch }, file) {
    try {
      await filesApi.cancelUpload(file.source);
      commit("removeLoadingFile", file.name);
      commit("onSuccess", "success.Cancel");
    } catch (err) {
      dispatch("onError", err);
    }
  },
  /**
   * uploadFolder in the current folder
   * @param name is the name of the folder
   */
  async uploadFolder({ commit, dispatch, rootState }, name) {
    try {
      if (
        isFileNameExists({
          name,
          files: state.files,
          loadingFiles: rootState.loading.loadingFiles,
        })
      )
        throw new Error("שם התיקייה כבר קיים בתיקייה הנוכחית");
      const folder = await filesApi.uploadFolder({
        name,
        parent: state.currentFolder,
      });
      folder.owner = "אני";

      commit("onSuccess", "success.Folder");
      commit("addFile", folder);
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
      router.push("/404");
    }
  },
  async getAncestors({ commit }, folderID) {
    const breadcrumbs = await filesApi.getFolderHierarchy(folderID);
    commit("setHierarchy", breadcrumbs);
  },
  async editFile({ commit, dispatch }, { file, name }) {
    try {
      const res = await filesApi.editFile({ file, name });

      commit("onFileRename", res);
      commit("onSuccess", "success.Edit");
    } catch (err) {
      dispatch("onError", err);
    }
  },
  async moveFiles({ commit, dispatch }, { folderID, fileIDs }) {
    try {
      const data = await filesApi.moveFiles({ folderID, fileIDs });

      const failedFiles = data
        ? data.map((error) => {
          if (error.error) return error.id;
        })
        : [];

      const movedFiles = fileIDs.filter(
        (fileID) => !failedFiles.includes(fileID)
      );

      movedFiles.forEach((fileID) => {
        commit("deleteFile", fileID);
      });

      if (failedFiles.length)
        throw new Error("חלק מהקבצים שניסית להעביר נכשלו");
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

const mutations = {
  setFiles: (state, files) => {
    state.serverFilesLength = undefined;
    state.files = files
  },
  setServerFilesLength: (state, itemCount) => {
    state.serverFilesLength = itemCount;
  },
  deleteFile: (state, fileID) => {
    state.files = state.files.filter((file) => file.id !== fileID);
    state.chosenFiles = state.chosenFiles.filter((file) => {
      return file.id !== fileID;
    });
  },
  updateFile: (state, updateFile) => {
    const updatedFiles = state.files.map((file) => {
      if (file.id === updateFile.id) return updateFile;

      return file;
    });

    state.files = updatedFiles;
  },
  onFileRename: (state, { name, file }) => {
    if (state.files.includes(file)) {
      state.files.forEach((item) => {
        if (file === item) item.name = name;
      });
    }
  },
  updatePageNum: (state, pageNum) => {
    state.pageNum = pageNum
  },
  addFile: (state, file) => {
    const currentFolder = state.currentFolder
      ? state.currentFolder.id
      : undefined;

    if (
      (!(currentFolder === file.parent) && isOwner(file.ownerId)) ||
      state.files.includes(file)
    )
      return;

    state.files.push(file);
  },
  setChosenFiles: (state, files) => {
    state.chosenFiles = files;
  },
  addSelectedFile: (state, file) => {
    state.chosenFiles.push(file);
  },
  removeSelectedFile: (state, file) => {
    state.chosenFiles = state.chosenFiles.filter(chosenFile => chosenFile !== file);
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
