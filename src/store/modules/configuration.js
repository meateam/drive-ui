import { fetchConfig } from "@/api/configuration";
import router from "@/router";

const state = {
  version: "2.0",
  apmServerUrl: "",
  authUrl: "",
  environment: "",
  supportLink: "",
  approvalServiceUrl: "",
  externalShareName: "שיתוף חיצוני",
  myExternalSharesName: "השיתופים החיצוניים שלי",
  enableExternalShare: false,
  onlineEditorUrl: "http://13.79.160.153:3000/api/files",
};

const getters = {
  apmServerUrl: (state) => state.approvalServiceUrl,
  authUrl: (state) => state.authUrl,
  environment: (state) => state.environment,
  supportLink: (state) => state.supportLink,
  approvalServiceUrl: (state) => state.approvalServiceUrl,
  externalShareName: (state) => state.externalShareName,
  myExternalSharesName: (state) => state.myExternalSharesName,
  enableExternalShare: (state) => state.enableExternalShare,
  onlineEditorUrl: (state) => state.onlineEditorUrl,
  version: (state) => state.version,
};

const actions = {
  async fetchConfig({ commit }) {
    try {
      const config = await fetchConfig();
      commit("setConfig", config);
    } catch (err) {
      if (!err.response) {
        router.push("/503");
      } else {
        commit("onError", err);
      }
    }
  },
};

const mutations = {
  setConfig: (state, config) => {
    (state.apmServerUrl = config.apmServerUrl),
      (state.authUrl = config.authUrl),
      (state.environment = config.environment),
      (state.supportLink = config.supportLink),
      (state.approvalServiceUrl = config.approvalServiceUrl),
      (state.externalShareName = config.externalShareName),
      (state.myExternalSharesName = config.myExternalSharesName),
      (state.enableExternalShare = config.enableExternalShare);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
