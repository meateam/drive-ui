import { baseURL } from "@/utils/config";
import axios from "axios";

const state = {
  quota: {
    used: 0,
    limit: 0,
  },
};

const getters = {
  quota: (state) => state.quota,
};

const actions = {
  async getQuota({ commit }) {
    try {
      const res = await axios.get(`${baseURL}/api/user/quota`);
      commit("setQuota", res.data);
    } catch (err) {
      throw new Error(err);
    }
  },
};

const mutations = {
  setQuota: (state, quota) => {
    if (!quota || !quota.limit) return;
    state.quota.used = quota.used || 0;
    state.quota.limit = quota.limit;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
