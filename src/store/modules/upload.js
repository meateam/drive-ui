import * as filesApi from "@/api/files";
import { isFileNameExists } from "@/utils/isFileNameExists";

const ownerMy = "אני";
const MB5 = 5 << 20

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
  async [UploadAction.uploadFileToFolder]({ commit }, folderAndFile) {
    try {
      let res = null
      if (folderAndFile.file.size <= MB5) {
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
      res.owner = ownerMy;
      // lastUpdatedFileHandler.pushUpdatedFile(res.id);
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
    ) throw new Error("שם התיקייה כבר קיים בתיקייה הנוכחית");

    const res = filesApi.uploadFolder({
      name,
      parent: fileState.currentFolder,
    })
    res.owner = ownerMy;
    return res;

  },

  /**
  * createFolderInFolder create folder in folder without notification
  * @param parentAndName is contains parent: is the file to create, name: is the name of the folder
  */
  async [UploadAction.createFolderInFolder](_, parentAndName) {
    try {
      let res = filesApi.uploadFolder({
        name: parentAndName.name,
        parent: parentAndName.parent,
      })
      res.owner = ownerMy;
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
