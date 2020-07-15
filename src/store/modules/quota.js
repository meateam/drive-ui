import { fetchQuota } from "@/api/quota";

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
    const quota = await fetchQuota();
    commit("setQuota", quota);
  },
};

const mutations = {
  setQuota: (state, quota) => {
    if (!quota || !quota.limit) return;
    state.quota.used = quota.used || 0;
    state.quota.limit = quota.limit;
  },
  addQuota: (state, size) => {
    state.quota.used += size;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
