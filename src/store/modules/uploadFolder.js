import * as filesApi from "@/api/files";
import { isFileNameExists } from "@/utils/isFileNameExists";
import i18n from "@/i18n";

const MB = 1024 * 1024;
const MB5 = MB * 5;

export const UploadSet = {
  isUpload: "SetUploadIsUpload"
}

export const UploadGet = {
  isUpload: "GetUploadIsUpload"
}

export const UploadAction = {
  uploadFileToFolder: "ActionUploadUploadFileToFolder",
  createFolder: "ActionUploadCreateFolder",
  createFolderInFolder: "ActionUploadCreateFolderInFolder"
}

const state = {
  isUpload: false
};

const getters = {
  [UploadGet.isUpload]: (state) => state.isUpload,
};

const actions = {

  /**
  * uploadFileToFolder create multipart or resumable upload by the file size
  * @param file is the file to upload
  */
  async [UploadAction.uploadFileToFolder]({ commit }, { folder, file }) {
    try {
      let res = null
      
      const loadingFileCallBack = (file, event, source) => {
        commit("addLoadingFile", {
          name: file.name,
          progress: Math.round((100 * event.loaded) / event.total),
          source,
        });
      }

      if (file.size <= MB5) {
        res = await filesApi.multipartUpload({
          file: file,
          parent: folder,
        }, loadingFileCallBack)
      } else {
        res = await filesApi.resumableUpload({
          file: file,
          parent: folder,
        }, loadingFileCallBack);
      }
      res.owner = i18n.t("me");
      commit("addQuota", res.size);
      return res;
    } catch (err) {
      throw new Error(err.message)
    }
  },

  /**
   * createFolder in the current folder without notification
   * @param name is the name of the folder
   */
  async [UploadAction.createFolder]({ rootState }, name) {

    const fileState = rootState.files;
    const loadingState = rootState.loading;

    if (
      isFileNameExists({
        name,
        files: fileState.files,
        loadingFiles: loadingState.loadingFiles,
      })
    ) { throw new Error(i18n.t("errors.folderExistInFolder")); }

    const res = filesApi.uploadFolder({
      name,
      parent: fileState.currentFolder,
    })
    res.owner = i18n.t("me");
    return res;

  },

  /**
  * createFolderInFolder create folder in folder without notification
  * @param parentAndName is contains parent: is the file to create, name: is the name of the folder
  */
  async [UploadAction.createFolderInFolder](_, { name, parent }) {
    try {
      let res = filesApi.uploadFolder({
        name: name,
        parent: parent,
      })
      res.owner = i18n.t("me");
      return res;
    } catch (err) {
      throw new Error(err.message)
    }
  },
}

const mutations = {
  [UploadSet.isUpload]: (state, payload) => { state.isUpload = payload },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
