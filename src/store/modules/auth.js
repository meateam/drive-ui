import cookies from "js-cookie";
import { Base64 } from "js-base64";

const state = {
  token: cookies.get("kd-token") || undefined,
  user: undefined,
};

const getters = {
  isAuthenticated: (state) => !!state.token && !!state.user,
  user: (state) => state.user,
};

const actions = {
  async authenticate({ rootState, dispatch }) {
    if (state.token) return dispatch("parseToken");
    window.location.replace(rootState.configuration.authUrl, "_self");
  },
  parseToken({ commit }) {
    const token = state.token;
    const parts = token.split(".");

    if (parts.length !== 3) {
      throw new Error("token malformed");
    }

    const user = JSON.parse(Base64.decode(parts[1]));

    if (Math.round(new Date().getTime() / 1000) > user.exp) {
      throw new Error("token expired");
    }

    commit("setUser", user);
  },
};

const mutations = {
  setToken: () => (state.token = cookies.get("kd-token")),
  setUser: (state, user) => (state.user = user),
};

export default {
  state,
  getters,
  actions,
  mutations,
};