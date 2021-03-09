import * as filesApi from "@/api/files";
import { isFileNameExists } from "@/utils/isFileNameExists";

export const Set = {
  isUpload: "SetUploadIsUpload"
}

export const Get = {
  isUpload: "GetUploadIsUpload"
}

export const Action = {
  uploadFileToFolder: "ActionUploadUploadFileToFolder",
  createFolder: "ActionUploadCreateFolder",
  createFolderInFolder: "ActionUploadCreateFolderInFolder"
}

const state = {
  isUpload: false
};

const getters = {
  [Get.isUpload]: (state) => state.isUpload,
};

const actions = {

  /**
  * uploadFileToFolder create multipart or resumable upload by the file size
  * @param file is the file to upload
  */
  async [Action.uploadFileToFolder]({ commit, dispatch }, folderAndFile) {
    try {
      let res = null
      if (folderAndFile.file.size <= 5 << 20) {
        res = await filesApi.multipartUpload({
          file: folderAndFile.file,
          parent: folderAndFile.folder,
        }, (file, event, source) => {
            commit("addLoadingFile", {
              name: file.name,
              progress: Math.round((100 * event.loaded) / event.total),
              source,
            });
          })
      } else {
        res = await filesApi.resumableUpload({
          file: folderAndFile.file,
          parent: folderAndFile.folder,
        },
        (file, event, source) => {
          commit("addLoadingFile", {
            name: file.name,
            progress: Math.round((100 * event.loaded) / event.total),
            source,
          });
        });
      }
      res.owner = "אני";
      // lastUpdatedFileHandler.pushUpdatedFile(res.id);
      commit("addQuota", res.size);
      return res;
    } catch (err) {
      dispatch("onError", err);
    }
  },

  /**
   * createFolder in the current folder without notification
   * @param name is the name of the folder
   */
  async [Action.createFolder]({ dispatch, rootState }, name) {
    const fileState = rootState.files;
    const loadingState = rootState.loading;
    try {
      if (
        isFileNameExists({
          name,
          files: fileState.files,
          loadingFiles: loadingState.loadingFiles,
        })
      ) throw new Error("שם התיקייה כבר קיים בתיקייה הנוכחית");
      const res = filesApi.uploadFolder({
        name,
        parent: fileState.currentFolder,
      })
      res.owner = "אני";
      return res;
    } catch (err) {
      dispatch("onError", err);
    }
  },

  /**
  * createFolderInFolder create folder in folder without notification
  * @param parentAndName is contains parent: is the file to create, name: is the name of the folder
  */
  async [Action.createFolderInFolder]({ dispatch }, parentAndName) {
    try {
      let res = filesApi.uploadFolder({
        name: parentAndName.name,
        parent: parentAndName.parent,
      })
      res.owner = "אני";
      return res;
    } catch (err) {
      dispatch("onError", err);
    }
  },
}

const mutations = {
  [Set.isUpload]: (state, payload) => { state.isUpload = payload },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
