import * as filesApi from "@/api/files";
import { appendNumberIfFileExists } from "@/utils/isFileNameExists";
import i18n from "@/i18n";
import { isValidString } from "@/utils/validateInput";

const MB = 1024 * 1024;
const MB5 = MB * 5;

export const UploadSet = {
  isUpload: "SetUploadIsUpload",
};

export const UploadGet = {
  isUpload: "GetUploadIsUpload",
};

export const UploadAction = {
  uploadFileToFolder: "ActionUploadUploadFileToFolder",
  createFolder: "ActionUploadCreateFolder",
  createFolderInFolder: "ActionUploadCreateFolderInFolder",
};

const state = {
  isUpload: false,
};

const getters = {
  [UploadGet.isUpload]: (state) => state.isUpload,
};

const actions = {
  /**
   * uploadFileToFolder create multipart or resumable upload by the file size
   * @param file is the file to upload
   * @param folder the folder to upload the file to
   */
  async [UploadAction.uploadFileToFolder]({ commit, rootState }, { folder, file }) {
    try {
      if (!isValidString(file.name)) {
        commit("onWarning", "warnings.SpecialChars");
        return Promise.resolve();
      }
      let res = null;

      if (folder === rootState.files.currentFolder) {
        const [isExist, newFileName] = appendNumberIfFileExists({
          name: file.name,
          files: rootState.files.files,
          loadingFiles: rootState.loading.loadingFiles,
        });
  
        if (isExist) {
          if (newFileName) {
            file = new File([file], newFileName, { type: file.type });
          } else {
            throw new Error(i18n.t("errors.fileExistInFolder"));
          }
        }
      }

      const loadingFileCallBack = (file, event, source) => {
        commit("addLoadingFile", {
          name: file.name,
          progress: Math.round((100 * event.loaded) / event.total),
          source,
        });
      };

      if (file.size <= MB5) {
        res = await filesApi.multipartUpload(
          {
            file: file,
            parent: folder,
          },
          loadingFileCallBack
        );
      } else {
        res = await filesApi.resumableUpload(
          {
            file: file,
            parent: folder,
          },
          loadingFileCallBack
        );
      }
      res.owner = i18n.t("me");
      commit("addQuota", res.size);
      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  /**
   * createFolder in the current folder without notification
   * @param name is the name of the folder
   */
  async [UploadAction.createFolder]({ rootState, commit }, name) {
    if (!isValidString(name)) {
      commit("onWarning", "warnings.SpecialChars");
      return Promise.resolve();
    }

    const fileState = rootState.files;
    const loadingState = rootState.loading;

    const [isExist, newFileName] = appendNumberIfFileExists({
      name: name,
      files: fileState.files,
      loadingFiles: loadingState.loadingFiles,
      isFolder: true,
    });

    if (isExist) {
      if (newFileName) {
        name = newFileName;
      } else {
        throw new Error(i18n.t("errors.folderExistInFolder"));
      }
    }

    const res = filesApi.uploadFolder({
      name,
      parent: fileState.currentFolder,
    });
    res.owner = i18n.t("me");
    return res;
  },

  /**
   * createFolderInFolder create folder in folder without notification
   * @param parentAndName is contains parent: is the file to create, name: is the name of the folder
   */
  async [UploadAction.createFolderInFolder]({ commit }, { name, parent }) {
    try {
      if (!isValidString(name)) {
        commit("onWarning", "warnings.SpecialChars");
        return Promise.resolve();
      }
      let res = filesApi.uploadFolder({
        name: name,
        parent: parent,
      });
      res.owner = i18n.t("me");
      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

const mutations = {
  [UploadSet.isUpload]: (state, payload) => {
    state.isUpload = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
