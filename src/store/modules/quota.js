import { baseURL } from "@/utils/config";

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
    const res = await fetch(`${baseURL}/api/user/quota`);
    if (res.status === 200) {
      try {
        commit("setQuota", await res.json());
      } catch (err) {
        throw new Error(err.status);
      }
    } else {
      throw new Error(res.status);
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
