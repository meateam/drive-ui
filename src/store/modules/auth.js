import cookies from "js-cookie";

const state = {
  token: cookies.get("kd-token") || undefined,
};

const getters = {
  isAuthenticated: (state) => state.token,
};

const actions = {
  async authenticate({ commit, rootState }) {
    if (state.token) return;
    window.location.replace(rootState.configuration.authUrl, "_self");
    commit("setToken");
  },
};

const mutations = {
  setToken: () => (state.token = cookies.get("kd-token")),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
