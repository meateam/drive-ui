import Axios from "axios";
import { baseURL } from "@/utils/config";

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
};

const getters = {
  allowedFileTypes: (state) => state.allowedTypes,
  files: (state) => state.files,
};

const actions = {
  /**
   * fetch all the files in the root
   */
  async fetchRootFiles({ commit }) {
    try {
      const res = await Axios.get(`${baseURL}/api/files`);
      commit("setFiles", res.data);
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * fetch all the files in the received folder
   * @param {*} folderID the id of the current folder
   */
  async fetchFolderFiles({ commit }, folderID) {
    try {
      const res = await Axios.get(`${baseURL}/api/files?parent=${folderID}`);
      commit("setFiles", res.data);
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * deleteFile gets a file id and delete it
   * @param fileID is the id of the file to delete
   */
  async deleteFile({ commit }, fileID) {
    try {
      await Axios.delete(`${baseURL}/api/files/${fileID}`);
      commit("deleteFile", fileID);
    } catch (err) {
      throw new Error(err);
    }
  },
  // async uploadFile({ commit }) {},
  // async uploadFolder({ commit }) {},
  // async moveFile({ commit }) {},
  // async unShareFile({ commit }) {},
  // async downloadFile({ commit }) {},
  // async previewFile({ commit }) {},
};

const mutations = {
  setFiles: (state, files) => (state.files = files),
  deleteFile: (state, fileID) => {
    state.files.filter((file) => {
      return file.id !== fileID;
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
