import { fetchConfig } from "@/api/configuration";

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
  whiteListText: "או להיות מאושר באופן מיוחד"
};

const getters = {
  apmServerUrl: (state) => state.approvalServiceUrl,
  authUrl: (state) => state.authUrl,
  environment: (state) => state.environment,
  supportLink: (state) => state.supportLink,
  approvalServiceUrl: (state) => state.approvalServiceUrl,
  externalShareName: (state) => state.externalShareName,
  whiteListText: (state) => state.approverWhiteListText,
  myExternalSharesName: (state) => state.myExternalSharesName,
  enableExternalShare: (state) => state.enableExternalShare,
  onlineEditorUrl: (state) => state.onlineEditorUrl,
  version: (state) => state.version,
};

const actions = {
  async fetchConfig({ commit, dispatch }) {
    try {
      const config = await fetchConfig();
      commit("setConfig", config);
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

const mutations = {
  setConfig: (state, config) => {
    state.apmServerUrl = config.apmServerUrl,
      state.authUrl = config.authUrl,
      state.environment = config.environment,
      state.supportLink = config.supportLink,
      state.approvalServiceUrl = config.approvalServiceUrl,
      state.externalShareName = config.externalShareName,
      state.myExternalSharesName = config.myExternalSharesName,
      state.whiteListText = config.whiteListText || state.whiteListText,
      state.enableExternalShare = config.enableExternalShare;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
