/* eslint-disable no-empty-pattern */
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
  folderContentType: "application/vnd.drive.folder",
  currentFolder: undefined,
};

const getters = {
  allowedFileTypes: (state) => state.allowedTypes,
  files: (state) => state.files,
  folderContentType: (state) => state.folderContentType,
};

const actions = {
  /**
   * fetch all the files in the root and adds, the file owener id
   */
  async fetchRootFiles({ commit, dispatch, rootState }) {
    try {
      const res = await Axios.get(`${baseURL}/api/files`);
      const files = res.data;
      await Promise.all(
        files.map(async (file) => {
          if (file.ownerId === rootState.auth.user.id) file.owner = "אני";
          else file.owner = await dispatch("getUserNameByID", file.ownerId);
        })
      );
      commit("fetchFiles", files);
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * fetch all the files in the received folder
   * @param folderID the id of the current folder
   */
  async fetchFolderFiles({ commit }, folderID) {
    try {
      const res = await Axios.get(`${baseURL}/api/files?parent=${folderID}`);
      commit("fetchFiles", res.data);
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
  /**
   * uploadFile uploads file by size
   */
  async uploadFile({ dispatch }, file) {
    if (file.size <= 5 << 20) {
      await dispatch("multipartUpload", file);
    } else {
      await dispatch("resumableUpload", file);
    }
  },
  /**
   *
   * @param multipartUpload
   * @param file
   */
  async multipartUpload({ commit, rootState }, file) {
    try {
      let request = new XMLHttpRequest();
      request.open(
        "POST",
        `${baseURL}/api/upload?uploadType=multipart${
          state.currentFolder ? `&parent=${state.currentFolder}` : ""
        }`,
        true
      );
      request.withCredentials = true;
      request.setRequestHeader(
        "Authorization",
        `Bearer ${rootState.auth.token}`
      );

      request.onload = () => {
        if (request.status === 200) {
          commit("uploadFile", request.responseText);
        } else if (request.status === 409) {
          throw new Error(request.status);
        } else {
          throw new Error(request.responseText);
        }
      };

      request.onerror = (err) => {
        throw new Error(err);
      };

      const formData = new FormData();
      formData.append("file", file, file.name);

      request.send(formData);
    } catch (err) {
      throw new Error(err);
    }
  },
  // async uploadFolder({ commit }) {},
  // async moveFile({ commit }) {},
  // async unShareFile({ commit }) {},
  async downloadFile({}, fileID) {
    window.open(`${baseURL}/api/files/${fileID}?alt=media`);
  },
  // async previewFile({ commit }) {},
};

const mutations = {
  fetchFiles: (state, files) => (state.files = files),
  deleteFile: (state, fileID) => {
    state.files.filter((file) => {
      return file.id !== fileID;
    });
  },
  uploadFile: (state, file) => {
    if (state.currentFolder === file.parent) state.files.push(file);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
