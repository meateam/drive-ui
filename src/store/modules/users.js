/* eslint-disable no-empty-pattern */
import { baseURL } from "@/utils/config";
import Axios from "axios";

const state = {
  users: [],
};

const getters = {
  users: (state) => state.users,
};

const actions = {
  /**
   * getUserByID returns the user with the received id
   * @param id is the user id
   */
  async getUserByID({ dispatch }, id) {
    try {
      const res = await Axios.get(`${baseURL}/api/users/${id}`);
      return dispatch("formatUser", res.data.user);
    } catch (err) {
      throw new Error();
    }
  },
  /**
   * getUserNameByID returnes the user name with the received id
   * @param id is the user id
   */
  async getUserNameByID({ dispatch }, id) {
    try {
      const user = await dispatch("getUserByID", id);
      return user.fullName;
    } catch (err) {
      throw new Error();
    }
  },
  /**
   * searchUsersByName gets all the users with the received name
   * @param name is the name of the users
   */
  async searchUsersByName({ dispatch }, name) {
    try {
      const res = await Axios.get(`${baseURL}/api/users`, {
        params: { partial: name },
      });
      const users = res.data.users || [];
      return await Promise.all(
        users.map((user) => dispatch("formatUser", user))
      );
    } catch (err) {
      throw new Error();
    }
  },
  /**
   * getExternalUserByID returns the external user with the received id
   * @param id is the user id
   */
  async getExternalUserByID({ dispatch }, id) {
    try {
      const res = await Axios.get(`${baseURL}/api/delegators/${id}`);
      const user = res.user;
      user.firstName = res.user.first_name;
      user.lastName = res.user.last_name;
      user.fullName = res.user.full_name;
      user.hierarchyFlat = res.user.hierarchy;
      return dispatch("formatUser", user);
    } catch (err) {
      throw new Error();
    }
  },
  /**
   * searchExternalUsersByName sets the current users to the external users with the received name
   * @param name
   */
  async searchExternalUsersByName({ dispatch }, name) {
    try {
      const res = await Axios.get(`${baseURL}/api/delegators`, {
        params: { partial: name },
      });
      const users = res.data.users || [];
      return await Promise.all(
        users.map((user) => dispatch("formatUser", user))
      );
    } catch (err) {
      throw new Error();
    }
  },
  formatUser({}, user) {
    const formatedUser = user;
    formatedUser.display = `${user.firstName} ${
      user.lastName ? user.lastName : ""
    } > ${user.hierarchyFlat}`;
    return formatedUser;
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
