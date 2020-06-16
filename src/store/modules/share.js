/* eslint-disable no-empty-pattern */
import { baseURL } from "@/utils/config";
import Axios from "axios";

const state = {};

const getters = {};

const actions = {
  /**
   * getFileSharedUsers gets all the users that was shared with the file
   * @param fileID the id of the file
   */
  async getFileSharedUsers({ dispatch }, fileID) {
    const permissions = await dispatch("getPermissions", fileID);
    const users = await Promise.all(
      permissions.map(async (permission) => {
        return await dispatch("getUserByID", permission.userID);
      })
    );
    return users;
  },
  /**
   * getPermissions returns all the user id`s of the users that was shared with the file
   * @param fileID the id of the file
   */
  async getPermissions({}, fileID) {
    try {
      const res = await Axios.get(`${baseURL}/api/files/${fileID}/permissions`);
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  },
  /**
   * getFileExternalSharedUsers gets all the external users that was shared with the file
   * @param fileID the id of the file
   */
  async getFileExternalSharedUsers({ dispatch }, fileID) {
    const permissions = await dispatch("getExternalPermissions", fileID);
    const users = await Promise.all(
      permissions.map(async (permission) => {
        return await dispatch("getExternalUserByID", permission.userID);
      })
    );
    return users;
  },
  /**
   * getExternalPermissions returns all the user id`s of the extenal users that was shared with the file
   * @param fileID the id of the file
   */
  async getExternalPermissions({}, fileID) {
    try {
      const res = await Axios.get(`${baseURL}/api/files/${fileID}/permits`);
      return res.data || [];
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
  async shareUser({}, { file, user, role }) {
    try {
      await Axios.put(`${baseURL}/api/files/${file.id}/permissions`, {
        userID: user.id,
        role,
        override: true,
      });
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
        await dispatch("shareUser", { file, user, role });
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
