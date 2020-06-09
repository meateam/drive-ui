import { baseURL } from "@/utils/config";
import axios from "axios";

const state = {};

const getters = {};

const actions = {
  /**
   *getUserByID returns the user with the received id
   * @param id is the user id
   */
  // eslint-disable-next-line no-empty-pattern
  async getUserByID({}, id) {
    const res = await axios.get(`${baseURL}/api/users/${id}`);
    return res.data.user;
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
