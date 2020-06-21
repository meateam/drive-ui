/* eslint-disable no-empty-pattern */
import { baseURL } from "@/utils/config";
import Axios from "axios";

const state = {
};

const getters = {
};

const actions = {
  /**
   * getPermissions returns all the user id`s of the users that was shared with the file
   * @param fileID the id of the file
   */
  async getPermissions({ dispatch }, fileID) {
    try {
      const res = await Axios.get(`${baseURL}/api/files/${fileID}/permissions`);
      const users = await dispatch(
        "getUsersByIDs",
        res.data.map((permission) => permission.userID)
      );
      return users;
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * getExternalPermissions returns all the user id`s of the extenal users that was shared with the file
   * @param fileID the id of the file
   */
  async getExternalPermissions({ dispatch }, fileID) {
    try {
      const res = await Axios.get(`${baseURL}/api/files/${fileID}/permits`);
      const users = await dispatch(
        "getExternalUsersByIDs",
        res.data ? res.data.map((permit) => permit.userID) : []
      );
      return users || [];
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * shareUser adds a permision on a file to another user
   * @param fileID is the id of the file to share
   * @param userID is the id of the user ro share
   * @param role is the role of the share
   */
  async shareUser({ commit, dispatch }, { fileID, userID, role }) {
    try {
      const res = await Axios.put(
        `${baseURL}/api/files/${fileID}/permissions`,
        {
          userID,
          role,
          override: true,
        }
      );
      const user = await dispatch("getUserByID", res.data.userID);
      commit("onUserShare", { fileID, user });
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * shareUser adds a permision on the files to all the users
   * @param files is the list of the files to share
   * @param users is the list of the users to share
   * @param role is the role of the share
   */
  shareUsers({ dispatch }, { files, users, role }) {
    users.forEach(async (user) => {
      files.forEach(async (file) => {
        await dispatch("shareUser", { fileID: file.id, userID: user.id, role });
      });
    });
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
