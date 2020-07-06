import { fetchConfig } from "@/api/configuration"

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
};

const getters = {
  apmServerUrl: (state) => state.approvalServiceUrl,
  authUrl: (state) => state.authUrl,
  environment: (state) => state.environment,
  supportLink: (state) => state.supportLink,
  approvalServiceUrl: (state) => state.approvalServiceUrl,
  externalShareName: (state) => state.externalShareName,
  enableExternalShare: (state) => state.enableExternalShare,
  version: (state) => state.version,
};

const actions = {
  async fetchConfig({ commit }) {
    try {
      const config = await fetchConfig();
      commit("setConfig", config);
    } catch (err) {
      throw new Error(err)
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
