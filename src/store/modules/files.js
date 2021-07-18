import * as filesApi from "@/api/files";
import * as favApi from "@/api/favorite"
import * as lastUpdatedFileHandler from "@/utils/lastUpdatedFileHandler";
import router from "@/router";
import i18n from "@/i18n";
import { sortFiles } from "@/utils/sortFiles";
import { fileTypes, pageSize } from "@/config";
import { isOwner } from "@/utils/isOwner";
import { isFileOwner, getFileOwnerName, getExternalFileOwnerName } from "@/utils/formatFile";
import { appendNumberIfFileExists } from "@/utils/isFileNameExists";
import { isFolder } from "@/utils/isFolder";
import { getNetworkItemByAppId } from "@/utils/networkDest";

const MB = 1024 * 1024;
const MB5 = MB * 5;

const state = {
  files: [],
  sharedFiles: [],
  chosenFiles: [],
  currentFolderHierarchy: [],
  pageNum: 1,
  currentFolder: undefined,
  currentFile: undefined,
  serverFilesLength: undefined,
  isShared: undefined,
};

const getters = {
  files: (state) => (state.isShared ? state.files : sortFiles(state.files)),
  serverFilesLength: (state) => state.serverFilesLength,
  pageNum: (state) => state.pageNum,
  chosenFiles: (state) => state.chosenFiles,
  folderRoles: (state) => state.folderRoles,
  currentFolder: (state) => state.currentFolder,
  currentFile: (state) => state.currentFile,
  folders: (state) => state.files.filter((file) => file.type === fileTypes.folder),
  currentFolderHierarchy: (state) => state.currentFolderHierarchy,
  isShared: (state) => state.isShared,
};

const actions = {
  async fetchFiles({ commit, dispatch }) {
    try {
      const files = await filesApi.fetchFiles(state.currentFolder);

      commit("setIsShared", false);
      dispatch("updateFetchedFiles", files);
    } catch (err) {
      dispatch("onError", err);
    }
  },

  async fetchFavFiles({ dispatch }) {
    try {
      const files = await favApi.fetchFavFiles(state.currentFolder);
      dispatch("updateFetchedFiles", files);
    } catch (err) {
      dispatch("onError", err);
    }
  },

  async fetchFile({ dispatch }) {
    try {
      const files = [await filesApi.getFileByID(state.currentFile.id)];
      dispatch("updateFetchedFiles", files);
    } catch (err) {
      dispatch("onError", err);
    }
  },
  async updateFetchedFiles({ commit, dispatch }, files) {
    try {
      commit("setFiles", files);

      files.forEach(async (file) => {
        const formattedFile = file;
        const isOwner = isFileOwner(file.ownerId);
        let ownerName;
        if (isOwner) {
          ownerName = i18n.t("me");
        } else if (file.appID === "drive") {
          ownerName = await getFileOwnerName(file.ownerId);
        } else {
          ownerName = await getExternalFileOwnerName(file.ownerId, getNetworkItemByAppId(file.appID).value);
        }
        formattedFile.owner = ownerName;
        commit("updateFile", formattedFile);
      });
    } catch (err) {
      dispatch("onError", err);
    }
  },
  /**
   * fetchSharedFiles fetch the shared files in the root folder
   */
  async fetchSharedFiles({ commit, dispatch }, { pageNum, isAppend, pageAmount }) {
    try {
      const permissions = await filesApi.fetchSharedFiles(pageNum || 0, pageAmount || pageSize);
      const files = permissions.files.successful;

      commit("setIsShared", true);
      commit("updatePageNum", pageNum + 1);
      isAppend ? commit("setAppendFiles", files) : commit("setFiles", files);
      commit("setServerFilesLength", permissions.itemCount);

      await Promise.all(
          files.map(async (file) => {
              const formattedFile = file;
              formattedFile.owner = await getFileOwnerName(file.ownerId);
              commit("updateFile", formattedFile);
          })
      );
    } catch (err) {
      dispatch("onError", err);
    }
  },
  async fetchExternalTransferredFiles({ commit, dispatch }, { pageNum, appId, dest }) {
    try {
      const permissions = await filesApi.fetchExternalTransferredFiles(pageNum || 0, appId);
      const files = permissions.files.successful;

      commit("setIsShared", false);
      commit("setFiles", files);
      commit("setServerFilesLength", permissions.itemCount);

      await Promise.all(
          files.map(async (file) => {
              const formattedFile = file;
              formattedFile.owner = await getExternalFileOwnerName(
                  file.ownerId,
                  dest
              );
              commit("updateFile", formattedFile);
          })
      );
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

      commit("setIsShared", false);
      commit("setFiles", files);

      files.forEach(async (file) => {
        const formattedFile = file;
        const isOwner = isFileOwner(file.ownerId);

        formattedFile.owner = isOwner ? i18n.t("me") : await getFileOwnerName(file.ownerId);
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
        commit("onSuccess", files.length === 1 ? "success.DeleteItem" : "success.DeleteItems");
      })
      .catch((err) => {
        dispatch("onError", err);
      });
  },
  removePermissions({ dispatch, commit }, files) {
    Promise.all(
      files.map(async (file) => {
        await filesApi.deleteFile(file.id);
        commit("deleteFile", file.id);
      })
    )
      .then(() => {
        commit("updatePageNum", 1);
        dispatch("getQuota");
        commit("onSuccess", files.length === 1 ? "success.DeleteItem" : "success.DeleteItems");
      })
      .catch((err) => {
        if (err && err.response && err.response.status && err.response.status == 403) {
          const removePermissionsError = new Error(i18n.t("delete.ErrorNoPermissions"));
          dispatch("onError", removePermissionsError);
        } else {
          dispatch("onError", err);
        }
      });
  },
  /**
   * uploadFile create multipart or resumable upload by the file size
   * @param file is the file to upload
   */
  async uploadFile({ commit, rootState }, file) {
    const [isExist, newFileName] = appendNumberIfFileExists({
      name: file.name,
      files: state.files,
      loadingFiles: rootState.loadingState.loadingFiles,
    });

    if (isExist) {
      if (newFileName) {
          file = new File([file], newFileName, { type: file.type });
      } else {
        throw new Error(i18n.t("errors.fileExistInFolder"));
      }
    }

    let metadata = undefined;
    const loadingFileCallBack = (file, event, source) => {
      commit("addLoadingFile", {
        name: file.name,
        progress: Math.round((100 * event.loaded) / event.total),
        source,
      });
    };

    if (file.size <= MB5) {
      metadata = await filesApi.multipartUpload(
        {
          file: file,
          parent: state.currentFolder,
        },
        loadingFileCallBack
      );
    } else {
      metadata = await filesApi.resumableUpload(
        {
          file: file,
          parent: state.currentFolder,
        },
        loadingFileCallBack
      );
    }

    metadata.owner = i18n.t("me");
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
      .then(() => commit("onSuccess", files.length === 1 ? "success.File" : "success.Files"))
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
      const [isExist, newFileName] = appendNumberIfFileExists({
        name: name,
        files: state.files,
        loadingFiles: rootState.loading.loadingFiles,
        isFolder: true,
      });
  
      if (isExist) {
        if (newFileName) {
          name = newFileName;
        } else {
          throw new Error(i18n.t("errors.folderExistInFolder"));
        }
      }
     
      const folder = await filesApi.uploadFolder({
        name,
        parent: state.currentFolder,
      });
      folder.owner = i18n.t("me");

      commit("onSuccess", "success.Folder");
      commit("addFile", folder);
    } catch (err) {
      dispatch("onError", err);
    }
  },

  /**
   * onFolderChange change the current folder by the recived id
   * @param fileOrFolderID is the id of the current file or folder
   */
  async onFolderChange({ dispatch, commit }, fileOrFolderID) {
    try {
      if (!fileOrFolderID) {
        commit("setCurrentFolder", undefined);
        commit("setHierarchy", []);
      } else {
        const fileOrFolder = await filesApi.getFileByID(fileOrFolderID);
        if (isFolder(fileOrFolder.type)) {
          commit("updatePageNum", 1);
          commit("setCurrentFolder", fileOrFolder);
          dispatch("getAncestors", fileOrFolder.id);
        } else {
          commit("setCurrentFile", fileOrFolder);
          dispatch("getFileAncestors", fileOrFolder.id);
        }
      }
    } catch (err) {
      router.push("/404");
    }
  },
  async getAncestors({ commit }, folderID) {
    const breadcrumbs = await filesApi.getFolderHierarchy(folderID);
    commit("setHierarchy", breadcrumbs);
  },
  async getFileAncestors({ commit }, fileID) {
    const breadcrumbs = await filesApi.getFolderHierarchy(fileID);
    // Files hierarchy contains the current folder. So it is removed from the hierarchy and inserted to the current folder
    const lastFolder = breadcrumbs.pop() || [];
    let currFolder = [];
    if (lastFolder && lastFolder.id) {
      currFolder = await filesApi.getFileByID(lastFolder.id);
    }

    commit("setCurrentFolder", currFolder);
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

      const movedFiles = fileIDs.filter((fileID) => !failedFiles.includes(fileID));

      movedFiles.forEach((fileID) => {
        commit("deleteFile", fileID);
      });

      if (failedFiles.length) throw new Error(i18n.t("errors.failedToPassFiles"));
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

const mutations = {
  setFiles: (state, files) => {
    state.serverFilesLength = undefined;
    state.files = files;
  },
  setAppendFiles: (state, appendFiles) => {
    state.files = [...state.files, ...appendFiles];
  },
  setServerFilesLength: (state, itemCount) => {
    state.serverFilesLength = itemCount;
  },
  deleteFile: (state, fileID) => {
    state.files = state.files.filter((file) => file.id !== fileID);
    state.chosenFiles = state.chosenFiles.filter((file) => {
      return file.id !== fileID;
    });
    if (state.files.length == 0) state.serverFilesLength = 0;
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
    state.pageNum = pageNum;
  },
  addFile: (state, file) => {
    const currentFolder = state.currentFolder ? state.currentFolder.id : undefined;
    if ((!(currentFolder === file.parent) && isOwner(file.ownerId)) || state.files.includes(file)) return;
    state.files.push(file);
  },
  setChosenFiles: (state, files) => {
    state.chosenFiles = files;
  },
  addSelectedFile: (state, file) => {
    state.chosenFiles.push(file);
  },
  removeSelectedFile: (state, file) => {
    state.chosenFiles = state.chosenFiles.filter((chosenFile) => chosenFile !== file);
  },
  clearSelectedFiles: (state) => {
    state.chosenFiles = [];
  },
  setCurrentFolder: (state, folder) => {
    state.currentFolder = folder;
    state.chosenFiles = [];
    state.files = [];
  },
  setCurrentFile: (state, file) => {
    state.currentFile = file;
  },
  setHierarchy: (state, hieratchy) => {
    state.currentFolderHierarchy = hieratchy;
  },
  setIsShared: (state, isShared) => {
    state.isShared = isShared;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
