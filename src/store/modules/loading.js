const state = {
  onGoingRequests: 0,
  isLoading: false,
  loadingFiles: [],
};

const getters = {
  isLoading: (state) => state.isLoading,
  loadingFiles: (state) => state.loadingFiles,
};

const mutations = {
  addLoadingReq: (state) => {
    if (state.loadingFiles.length) return;

    state.onGoingRequests++;
    state.isLoading = true;
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
};

export default {
  state,
  getters,
  mutations,
};
