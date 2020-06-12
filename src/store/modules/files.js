/* eslint-disable no-empty-pattern */
import Axios from "axios";
import { baseURL } from "@/utils/config";

const state = {
  files: [],
  chosenFiles: [],
  folderContentType: "application/vnd.drive.folder",
  currentFolder: undefined,
  folderRoles: ["READ", "WRITE"]
};

const getters = {
  allowedFileTypes: (state) => state.allowedTypes,
  files: (state) => state.files,
  folderContentType: (state) => state.folderContentType,
  chosenFiles: (state) => state.chosenFiles,
  folderRoles: (state) => state.folderRoles,
  folders: (state) => state.files.filter(file => file.type === state.folderContentType),
};

const actions = {
  /**
   * fetch all the files in the root and adds, the file owener id
   */
  async fetchFiles({ commit, dispatch }) {
    try {
      const res = await Axios.get(
        `${baseURL}/api/files${
        state.currentFolder ? `&parent=${state.currentFolder}` : ""
        }`
      );
      const files = res.data;
      await Promise.all(
        files.map(async (file) => {
          dispatch("formatFile", file);
        })
      );
      commit("fetchFiles", files);
    } catch (err) {
      throw new Error(err);
    }
  },
  async formatFile({ dispatch, rootState }, file) {
    if (file.ownerId === rootState.auth.user.id) file.owner = "אני";
    else file.owner = await dispatch("getUserNameByID", file.ownerId);
    return file;
  },
  async getFileByID({ }, fileID) {
    const res = await Axios.get(`${baseURL}/api/files/${fileID}`);
    return res.data;
  },
  /**
   * deleteFile gets a file id and delete it
   * @param fileID is the id of the file to delete
   */
  async deleteFile({ commit, dispatch }, fileID) {
    try {
      const res = await Axios.delete(`${baseURL}/api/files/${fileID}`);
      commit("deleteFile", res.data[0]);
      commit("chooseFile", { isChecked: false, fileID: res.data[0] });
      dispatch("getQuota");
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * deleteFiles uses the method delete file to delete all the files in the chosen array
   */
  deleteFiles({ dispatch }) {
    state.chosenFiles.forEach(async (fileID) => {
      await dispatch("deleteFile", fileID);
    });
  },
  /**
   * uploadFile create multipart or resumable upload by the file size
   */
  async uploadFile({ dispatch }, file) {
    if (file.size <= 5 << 20) {
      await dispatch("multipartUpload", file);
    } else {
      await dispatch("resumableUpload", file);
    }
  },
  /**
   * multipartUpload create an upload with small size
   * @param file is the file that was chose by the user in the type blob
   */
  async multipartUpload({ dispatch, commit, rootState }, file) {
    try {
      if (dispatch('isNameNotValid', file.name)) throw new Error("Name already exists in the root");
      const request = new XMLHttpRequest();
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

      request.onload = async () => {
        if (request.status === 200) {
          const file = await dispatch("getFileByID", request.responseText);
          dispatch("formatFile", file);
          commit("updateFiles", file);
          dispatch("getQuota");
        } else if (request.status === 409) {
          throw new Error(request.status);
        } else {
          throw new Error(request.responseText);
        }
      };

      const formData = new FormData();
      formData.append("file", file, file.name);

      request.send(formData);
    } catch (err) {
      throw new Error(err);
    }
  },
  async resumableUpload({ dispatch, commit, rootState }, file) {
    try {
      if (dispatch('isNameNotValid', file.name)) throw new Error("Name already exists in the root");
      const uploadID = await dispatch("getUploadID", file);
      const request = new XMLHttpRequest();
      request.open(
        "POST",
        `${baseURL}/api/upload?uploadType=resumable&uploadId=${uploadID}${
        state.currentFolder ? `&parent=${state.currentFolder}` : ""
        }`,
        true
      );
      request.withCredentials = true;
      request.setRequestHeader(
        "Authorization",
        `Bearer ${rootState.auth.token}`
      );
      request.setRequestHeader(
        "Content-Range",
        `bytes 0-${file.size - 1}/${file.size}`
      );

      request.onload = async () => {
        if (request.status === 200) {
          const file = await dispatch("getFileByID", request.responseText);
          dispatch("formatFile", file);
          commit("updateFiles", file);
          dispatch("getQuota");
        } else if (request.status === 409) {
          throw new Error(request.status);
        } else {
          throw new Error(request.responseText);
        }
      };

      const formData = new FormData();
      formData.append("file", file, file.name);

      request.send(formData);
    } catch (err) {
      throw new Error(err);
    }
  },
  async getUploadID({ }, file) {
    try {
      const res = await Axios.post(
        `${baseURL}/api/upload`,
        {
          title: file.name,
          mimeType: file.type,
        },
        {
          headers: {
            "content-type": "application/json",
            "X-Content-Length": `${file.size}`,
          },
        }
      );
      return res.headers["x-uploadid"];
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * downloadFile downloads the file with the
   * @param fileID is the id of the file to download
   */
  downloadFile({ }, fileID) {
    window.open(`${baseURL}/api/files/${fileID}?alt=media`, "_blank");
  },
  /**
   * downloadFiles downloads all the files that where chosen
   */
  downloadFiles({ dispatch }) {
    state.chosenFiles.forEach((fileID) => {
      dispatch("downloadFile", fileID);
    });
  },
  /**
   * uploadFolder in the current folder
   * @param name is the name of the folder
   */
  async uploadFolder({ commit, dispatch }, name) {
    try {
      if (dispatch('isNameNotValid', name)) throw new Error("Name already exists in the root");
      const res = await Axios.post(
        `${baseURL}/api/upload?uploadType=multipart${
        state.currentFolder ? `&parent=${state.currentFolder}` : ""
        }`,
        {},
        {
          headers: {
            "Content-Type": state.folderContentType,
            "Content-Disposition": `filename=${encodeURIComponent(name)}`,
          },
        }
      );
      const folder = await dispatch("getFileByID", res.data);
      dispatch("formatFile", folder);
      commit('updateFiles', folder)
    } catch (err) {
      throw new Error(err)
    }
  },
  isNameNotValid({ }, name) {
    if (!name) return true;
    state.files.forEach(file => {
      return file.name == name;
    });
    return false;
  },
  // async moveFile({ commit }) {},
  // async unShareFile({ commit }) {},
  // async previewFile({ commit }) {},
};

const mutations = {
  fetchFiles: (state, files) => (state.files = files),
  deleteFile: (state, fileID) => {
    state.files = state.files.filter((file) => file.id !== fileID);
  },
  updateFiles: (state, file) => {
    if (state.currentFolder === file.parent) {
      state.files.push(file);
    }
  },
  chooseFile: (state, { isChecked, fileID }) => {
    if (isChecked && !state.chosenFiles.includes(fileID)) {
      state.chosenFiles.push(fileID);
    } else {
      state.chosenFiles = state.chosenFiles.filter((file) => {
        return file !== fileID;
      });
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
