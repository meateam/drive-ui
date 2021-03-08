import { fetchConfig } from "@/api/configuration";

const state = {
  version: "2.0",
  apmServerUrl: "",
  authUrl: "",
  environment: "",
  supportLink: "",
  dropboxSupportLink: "",
  externalShareName: "שיתוף חיצוני",
  myExternalSharesName: "השיתופים החיצוניים שלי",
  enableExternalShare: false,
  docsUrl: "http://13.79.160.153:3000",
  whiteListText: "או להיות מאושר באופן מיוחד",
  bereshitSupportLink: "",
  bamSupportNumber: "03555555",
  statusSuccessType: "success",
  statusFailedType: "failed",
  externalNetworkDests: [
    {
      appID: "appId1",
      approvalUIUrl: "http://approval.dropbox.rabaz.org",
      approvalUrl: "http://approval.dropbox.rabaz.org",
      label: "label1",
      value: "value1",
      isDefault: true,
    },
    {
      appID: "appId1",
      approvalUIUrl: "http://approval.dropbox.rabaz.org",
      approvalUrl: "http://approval.dropbox.rabaz.org",
      label: "label1",
      value: "value1",
      isDefault: false,
    },
  ],
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
  statusSuccessType: (state) => state.statusSuccessType,
  statusFailedType: (state) => state.statusFailedType,
  externalNetworkDests: (state) => state.externalNetworkDests,
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
    state.externalShareName = config.externalShareName;
    state.docsUrl = config.docsUrl;
    state.bamSupportNumber = config.bamSupportNumber;
    state.bereshitSupportLink = config.bereshitSupportLink;
    state.myExternalSharesName = config.myExternalSharesName;
    state.whiteListText = config.whiteListText || state.whiteListText;
    state.enableExternalShare = config.enableExternalShare;
    state.statusSuccessType = config.statusSuccessType;
    state.externalNetworkDests = config.externalNetworkDests;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
