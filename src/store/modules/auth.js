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
  logout({ commit }) {
    cookies.remove("kd-token");
    commit("setToken", undefined);
  },
  async addApproverInfos({ commit }, user) {
    const approverInfos = user.approverInfos.map(async (approverInfo) => {
      try {
        const res = await usersApi.getApproverInfo(user.id, approverInfo.dest);
        return res;
      } catch (e) {
        console.log(e);
      }
    });
    commit("setApproverInfos", approverInfos);
  },
  async parseToken({ commit, dispatch }) {
    try {
      const token = state.token;
      const parts = token.split(".");

      if (parts.length !== 3) {
        dispatch("logout");
        throw new Error("token malformed");
      }

      let user = JSON.parse(Base64.decode(parts[1]));

      if (Math.round(new Date().getTime() / 1000) > user.exp) {
        dispatch("logout");
        throw new Error("token expired");
      }

      user = {
        ...user,
        // TODO: change to env
        approverInfos: [
          {
            dest: "TOMCAL",
            canApprove: false,
            requestFaild: true,
          },
          {
            dest: "CTS",
            canApprove: false,
            requestFaild: true,
          },
        ],
      };

      commit("setUser", user);

      await dispatch("addApproverInfos", user);
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

const mutations = {
  setToken: (state) => (state.token = cookies.get("kd-token")),
  setUser: (state, user) => {
    state.user = user;
  },
  setApproverInfos: (state, approverInfos) => {
    state.user.approverInfos = approverInfos;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
