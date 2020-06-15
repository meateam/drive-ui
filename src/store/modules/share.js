/* eslint-disable no-empty-pattern */
import { baseURL } from "@/utils/config";
import Axios from "axios";

const state = {};

const getters = {};

const actions = {
  async getFileSharedUsers({ dispatch }, fileID) {
    const permissions = await dispatch("getPermissions", fileID);
    const users = await Promise.all(
      permissions.map(async (user) => {
        dispatch("getUserByID", user);
      })
    );
    return users;
  },
  async getPermissions({}, fileID) {
    try {
      const res = await Axios.get(`${baseURL}/api/files/${fileID}/permissions`);
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  },
  async getFileExternalSharedUsers({ dispatch }, fileID) {
    const permissions = await dispatch("getExternalPermissions", fileID);
    const users = await Promise.all(
      permissions.map(async (user) => {
        dispatch("getExternalUserByID", user);
      })
    );
    return users;
  },
  async getExternalPermissions({}, fileID) {
    try {
      const res = await Axios.get(`${baseURL}/api/files/${fileID}/permits`);
      return res.data || [];
    } catch (err) {
      throw new Error(err);
    }
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
