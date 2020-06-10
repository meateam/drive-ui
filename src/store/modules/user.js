/* eslint-disable no-empty-pattern */
import { baseURL } from "@/utils/config";
import axios from "axios";

const state = {};

const getters = {};

const actions = {
  /**
   *getUserByID returns the user with the received id
   * @param id is the user id
   */
  async getUserByID({}, id) {
    const res = await axios.get(`${baseURL}/api/users/${id}`);
    return res.data.user;
  },
  /**
   * getUserNameByID returnes the user name with the received id
   * @param id is the user id
   */
  async getUserNameByID({}, id) {
    const res = await axios.get(`${baseURL}/api/users/${id}`);
    return res.data.user.fullName;
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
