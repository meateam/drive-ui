/* eslint-disable no-empty-pattern */
import { baseURL } from "@/utils/config";
import Axios from "axios";

const state = {};

const getters = {};

const actions = {
  /**
   * getUserByID returns the user with the received id
   * @param id is the user id
   */
  async getUserByID({}, id) {
    try {
      const res = await Axios.get(`${baseURL}/api/users/${id}`);
      return res.data.user;
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
   * getAllUsers returns all the users
   */
  async getAllUsers({ dispatch }) {
    try {
      const users = await dispatch("searchUsersByName");
      return users;
    } catch (err) {
      throw new Error();
    }
  },
  /**
   * searchUsersByName gets all the users with the received name
   * @param name is the name of the users
   */
  async searchUsersByName({}, name) {
    try {
      const res = await Axios.get(
        `${baseURL}/api/users`,
        name ? { query: { partial: name } } : {}
      );
      return res.data;
    } catch (err) {
      throw new Error();
    }
  },
  /**
   * getExternalUserByID returns the external user with the received id
   * @param id is the user id
   */
  async getExternalUserByID({}, id) {
    try {
      const res = await Axios.get(`${baseURL}/api/delegators/${id}`);
      res.user.firstName = res.user.first_name;
      res.user.lastName = res.user.last_name;
      res.user.fullName = res.user.full_name;
      return res.data.user;
    } catch (err) {
      throw new Error();
    }
  },
  async searchExternalUsersByName({}, name) {
    try {
      const res = await Axios.get(
        `${baseURL}/api/delegators`,
        name ? { query: { partial: name } } : {}
      );
      return res.data;
    } catch (err) {
      throw new Error();
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
