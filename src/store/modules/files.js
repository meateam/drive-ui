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
  /**
   * fetchFiles fetch all the files in the current folder
   */
  async fetchFiles({ commit, dispatch }) {
    try {
      const res = await Axios.get(
        `${baseURL}/api/files${
        state.currentFolder ? `?parent=${state.currentFolder.id}` : ""
        }`
      );
      const files = res.data;
      Promise.all(
        files.map((file) => {
          dispatch("formatFile", file);
        })
      );
      commit("fetchFiles", files);
    } catch (err) {
      throw new Error(err);
    }
  },
  async getFilesByFolder({ }, folder) {
    try {
      const res = await Axios.get(
        `${baseURL}/api/files?type=${state.folderContentType}${
        folder.id ? `&parent=${folder.id}` : ""
        }`
      );
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * fetchSharedFiles fetch all the shared files in the current folder
   */
  async fetchSharedFiles({ commit, dispatch }) {
    try {
      const res = await Axios.get(`${baseURL}/api/files?shares`);
      const files = res.data;
      Promise.all(
        files.map((file) => {
          dispatch("formatFile", file);
        })
      );
      commit("fetchFiles", files);
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * fetchLastUpdateddFiles fetch all the files that where updated today in the current folder
   */
  async fetchLastUpdateddFiles({ commit, dispatch }) {
    try {
      const res = await Axios.get(`${baseURL}/api/files`);
      const files = res.data;
      Promise.all(
        files.filter((file) => {
          dispatch("formatFile", file);
          return file.updatedAt === new Date();
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

    file.createdAt = await dispatch("formatDate", file.createdAt);
    file.updatedAt = await dispatch("formatDate", file.updatedAt);

    file.permissions = await dispatch("getPermissions", file.id);
    file.permits = await dispatch("getExternalPermissions", file.id);

    return file;
  },
  async getFileByID({ }, fileID) {
    try {
      const res = await Axios.get(`${baseURL}/api/files/${fileID}`);
      return res.data;
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
      const res = await Axios.delete(`${baseURL}/api/files/${fileID}`);
      commit("deleteFile", res.data[0]);
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
  async multipartUpload({ dispatch, commit, rootState }, file) {
    try {
      if (await dispatch("isFileNameExists", file.name))
        throw new Error("Name already exists in the root");
      const request = new XMLHttpRequest();
      request.open(
        "POST",
        `${baseURL}/api/upload?uploadType=multipart${
        state.currentFolder ? `&parent=${state.currentFolder.id}` : ""
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
          commit("addFile", file);
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
  /**
   * resumableUpload is an upload for bigger files
   * @param file is the file to upload
   */
  async resumableUpload({ dispatch, commit, rootState }, file) {
    try {
      if (await dispatch("isFileNameExists", file.name))
        throw new Error("Name already exists in the root");
      const uploadID = await dispatch("getUploadID", file);
      const request = new XMLHttpRequest();
      request.open(
        "POST",
        `${baseURL}/api/upload?uploadType=resumable&uploadId=${uploadID}${
        state.currentFolder ? `&parent=${state.currentFolder.id}` : ""
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
          commit("addFile", file);
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
  /**
   * getUploadID is used for the resumable upload (for connecting all the pieces when the upload is finished)
   * @param file is the file to upload
   */
  async getUploadID({ }, file) {
    try {
      const res = await Axios.post(
        `${baseURL}/api/upload${
        state.currentFolder ? `?parent=${state.currentFolder.id}` : ""
        }`,
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
  async downloadFile({ dispatch }, fileID) {
    const file = await dispatch("getFileByID", fileID);
    if (file.type === state.folderContentType)
      throw new Error("Download folder is not allowed");
    window.open(`${baseURL}/api/files/${fileID}?alt=media`, "_blank");
  },
  /**
   * downloadFiles downloads all the files that where chosen
   */
  downloadFiles({ dispatch }, files) {
    files.forEach((file) => {
      dispatch("downloadFile", file.id);
    });
  },
  /**
   * uploadFolder in the current folder
   * @param name is the name of the folder
   */
  async uploadFolder({ commit, dispatch }, name) {
    try {
      if (await dispatch("isFileNameExists", name))
        throw new Error("Name already exists in the root");
      const res = await Axios.post(
        `${baseURL}/api/upload?uploadType=multipart${
        state.currentFolder ? `&parent=${state.currentFolder.id}` : ""
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
      commit("addFile", folder);
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * isFileNameExists checks if there is already file with the same name in the current folder.
   * @param name is the name of the new file
   */
  isFileNameExists({ }, name) {
    if (!name) return true;
    state.files.forEach((file) => {
      if (file.name === name) return true;
    });
    return false;
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
        const folder = await dispatch("getFileByID", folderID);
        commit("setCurrentFolder", folder);
        dispatch("getAncestors", folder.id);
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * getDate return the formated creation date
   * @param d is the date to format
   */
  formatDate({ }, d) {
    const date = new Date(d);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${day}.${month}.${year} ${hour}:${minutes}`;
  },
  async getAncestors({ commit }, folderID) {
    const ancestors = await Axios.get(
      `${baseURL}/api/files/${folderID}/ancestors`
    );
    commit("setHierarchy", ancestors ? ancestors.data : []);
  },
  async editFile({ commit }, { file, name }) {
    try {
      const res = await Axios.put(`${baseURL}/api/files/${file.id}`, {
        name,
      });
      if (res.data) throw new Error(res.data.error);
      commit("onFileRename", { file, name });
    } catch (err) {
      throw new Error(err);
    }
  },
  async moveFile({ commit }, { folderID, fileIDs }) {
    try {
      await Axios.put(`${baseURL}/api/files`, {
        partialFile: {
          parent: folderID
        },
        idList: fileIDs
      });
      fileIDs.forEach(fileID => { commit('deleteFile', fileID) })
    } catch (err) {
      throw new Error(err);
    }
  },
  // async unShareFile({ commit }) {},
  // async previewFile({ commit }) {},
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
