const state = {
  version: "2.0",
  folderContentType: "application/vnd.drive.folder",
  baseURL: "http://localhost:8080",
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
  folderContentType: (state) => state.folderContentType,
};

const actions = {
  async fetchConfig({ commit }) {
    const res = await fetch(`${state.baseURL}/api/config`);
    const config = await res.json();
    console.log(config);
    commit("setConfig", config);
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
