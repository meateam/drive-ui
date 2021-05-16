import { fetchConfig } from "@/api/configuration";

const state = {
  version: "2.0",
  apmServerUrl: "",
  authUrl: "",
  CTSSuffix: "",
  environment: "",
  supportLink: "",
  dropboxSupportLink: "",
  externalShareName: "שיתוף חיצוני",
  myExternalSharesName: "השיתופים החיצוניים שלי",
  enableExternalShare: false,
  docsUrl: "http://13.79.160.153:3000",
  localOfficeUrl: "http://13.79.160.153:3000",
  whiteListText: "או להיות מאושר באופן מיוחד",
  bereshitSupportLink: "",
  bamSupportNumber: "03555555",
  statusSuccessType: "success",
  statusFailedType: "failed",
  statusInProgressType: "in progress",
  statusWaitingForReview: "STEP_REQUEST_IS_PENDING_APPROVAL",
  statusSuccessNames: ["STEP_UPLOAD_CLEANUP_SUCCESSFULL", "STEP_TERMINAL_SEND_FINISHED"],
  externalNetworkDests: [
    {
      appID: "appId1",
      approvalUIUrl: "http://approval.dropbox.rabaz.org",
      approvalUrl: "http://approval.dropbox.rabaz.org",
      label: "label1",
      value: "value1",
      isDefault: true,
      isEnabled: true,
    },
  ],
};

const getters = {
  apmServerUrl: (state) => state.approvalServiceUrl,
  authUrl: (state) => state.authUrl,
  CTSSuffix: (state) => state.CTSSuffix,
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
  localOfficeUrl: (state) => state.localOfficeUrl,
  version: (state) => state.version,
  statusSuccessType: (state) => state.statusSuccessType,
  statusFailedType: (state) => state.statusFailedType,
  statusInProgressType: (state) => state.statusInProgressType,
  externalNetworkDests: (state) => state.externalNetworkDests,
  statusWaitingForReview: (state) => state.statusWaitingForReview,
  statusSuccessNames: (state) => state.statusSuccessNames,
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
    state.CTSSuffix = config.CTSSuffix;
    state.environment = config.environment;
    state.supportLink = config.supportLink;
    state.dropboxSupportLink = config.dropboxSupportLink;
    state.externalShareName = config.externalShareName;
    state.docsUrl = config.docsUrl;
    state.localOfficeUrl = config.localOfficeUrl;
    state.bamSupportNumber = config.bamSupportNumber;
    state.bereshitSupportLink = config.bereshitSupportLink;
    state.myExternalSharesName = config.myExternalSharesName;
    state.whiteListText = config.whiteListText || state.whiteListText;
    state.enableExternalShare = config.enableExternalShare;
    state.externalNetworkDests = config.externalNetworkDests;
    state.statusInProgressType = config.statusInProgressType;
    state.statusFailedType = config.statusFailedType;
    state.statusSuccessType = config.statusSuccessType;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
