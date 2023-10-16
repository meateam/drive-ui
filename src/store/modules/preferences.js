const state = {
  fileView: window.localStorage.getItem("fileView") || "0",
  showNewDrivePopup: true,
};

const getters = {
  fileView: (state) => state.fileView,
  showNewDrivePopup: (state) => state.showNewDrivePopup,
};

const actions = {
  async toggleFileView({ commit }, view) {
    window.localStorage.setItem("fileView", view);
    commit("clearSelectedFiles");
    commit("setFileView", view);
  },
};

const mutations = {
  setFileView: (state, view) => {
    state.fileView = view;
  },
  hideNewDrivePopup: () => {
    state.showNewDrivePopup = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
