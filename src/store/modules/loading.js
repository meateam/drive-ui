const state = {
  onGoingRequests: 0,
  isLoading: false,
  isPopupOpen: false,
  isUploadFolder: false,
  loadingFiles: [],
  pendingGetRequests: [],
};

const getters = {
  isLoading: (state) => state.isLoading,
  isPopupOpen: (state) => state.isPopupOpen,
  isUploadFolder: (state) => state.isUploadFolder,
  loadingFiles: (state) => state.loadingFiles,
  pendingGetRequests: (state) => state.pendingGetRequests,
};

const actions = {
  onRouteChange(_, from) {
    if (from.path !== "/") {
      state.pendingGetRequests.forEach(source => {
        source.cancel();
      });
    }
  }
}

const mutations = {
  setUploadFolder: (state, status) => {
    state.isUploadFolder = status;
  },
  addLoadingReq: (state) => {
    if (state.loadingFiles.length) return;

    state.onGoingRequests++;
    state.isLoading = true;
  },
  addGetReq: (state, cancelToken) => {
    state.pendingGetRequests.push(cancelToken);
  },
  removeLoadingReq: (state) => {
    if (state.onGoingRequests > 0) state.onGoingRequests--;

    if (state.onGoingRequests === 0) {
      state.isLoading = false;
    }
  },
  addLoadingFile: (state, file) => {
    // this loading is difrrent from the regular axios loading
    state.isLoading = false;

    if (!state.loadingFiles.filter((item) => item.name === file.name).length) {
      state.loadingFiles.push(file);
    } else {
      const index = state.loadingFiles.findIndex(
        (item) => item.name == file.name
      );
      state.loadingFiles[index].progress = file.progress;
    }
  },
  removeLoadingFile: (state, fileName) => {
    state.loadingFiles = state.loadingFiles.filter(
      (file) => file.name !== fileName
    );
  },
  removeLoadingFiles: (state) => (state.loadingFiles = []),
  changePopupStatus: (state) => (state.isPopupOpen = !state.isPopupOpen),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
