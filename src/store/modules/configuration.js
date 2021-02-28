import { fetchConfig } from "@/api/configuration";

const state = {
  version: "2.0",
  apmServerUrl: "",
  authUrl: "",
  environment: "",
  supportLink: "",
  dropboxSupportLink: "",
  approvalServiceUrl: "http://approval.dropbox.rabaz.org",
  approvalServiceUIUrl: "http://approval.dropbox.rabaz.org",
  externalShareName: "שיתוף חיצוני",
  myExternalSharesName: "השיתופים החיצוניים שלי",
  enableExternalShare: false,
  docsUrl: "http://13.79.160.153:3000",
  whiteListText: "או להיות מאושר באופן מיוחד",
  bereshitSupportLink: "",
  bamSupportNumber: "03555555",
};

const getters = {
  apmServerUrl: (state) => state.approvalServiceUrl,
  authUrl: (state) => state.authUrl,
  environment: (state) => state.environment,
  supportLink: (state) => state.supportLink,
  dropboxSupportLink: (state) => state.dropboxSupportLink,
  approvalServiceUrl: (state) => state.approvalServiceUrl,
  approvalServiceUIUrl: (state) => state.approvalServiceUIUrl,
  externalShareName: (state) => state.externalShareName,
  whiteListText: (state) => state.approverWhiteListText,
  myExternalSharesName: (state) => state.myExternalSharesName,
  enableExternalShare: (state) => state.enableExternalShare,
  bereshitSupportLink: (state) => state.bereshitSupportLink,
  bamSupportNumber: (state) => state.bamSupportNumber,
  docsUrl: (state) => state.docsUrl,
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
    state.apmServerUrl = config.apmServerUrl;
    state.authUrl = config.authUrl;
    state.environment = config.environment;
    state.supportLink = config.supportLink;
    state.dropboxSupportLink = config.dropboxSupportLink;
    state.approvalServiceUIUrl = config.approvalServiceUIUrl;
    state.approvalServiceUrl = config.approvalServiceUrl;
    state.externalShareName = config.externalShareName;
    state.docsUrl = config.docsUrl;
    state.bamSupportNumber = config.bamSupportNumber;
    state.bereshitSupportLink = config.bereshitSupportLink;
    state.myExternalSharesName = config.myExternalSharesName;
    state.whiteListText = config.whiteListText || state.whiteListText;
    state.enableExternalShare = config.enableExternalShare;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
