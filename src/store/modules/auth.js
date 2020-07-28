import cookies from "js-cookie";
import { Base64 } from "js-base64";
import * as usersApi from "@/api/users";

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
    if (state.token) {
      await dispatch("parseToken");
    } else if (rootState.configuration.authUrl) {
      window.location.replace(rootState.configuration.authUrl);
    } else {
      return;
    }
  },
  async parseToken({ commit, dispatch }) {
    try {
      const token = state.token;
      const parts = token.split(".");

      if (parts.length !== 3) {
        throw new Error("token malformed");
      }

      let user = JSON.parse(Base64.decode(parts[1]));

      if (Math.round(new Date().getTime() / 1000) > user.exp) {
        throw new Error("token expired");
      }

      const approvalInfo = await usersApi.getApproverInfo(user.id);

      user = {
        ...user,
        approvalInfo
      }

      commit("setUser", user);
    } catch (err) {
      dispatch("onError", err)
    }
  },
};

const mutations = {
  setToken: (state) => (state.token = cookies.get("kd-token")),
  setUser: (state, user) => (state.user = user),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
