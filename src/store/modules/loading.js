const state = {
    onGoingRequests: 0,
    isLoading: false,
    isUploadFolder: false,
    loadingFiles: [],
    pendingGetRequests: [],
};

const getters = {
    isLoading: (state) => state.isLoading,
    isUploadFolder: (state) => state.isUploadFolder,
    loadingFiles: (state) => state.loadingFiles,
    pendingGetRequests: (state) => state.pendingGetRequests,
};

const actions = {
    onRouteChange(_, from) {
        if (from.path !== "/") {
            state.pendingGetRequests.forEach((source) => {
                source.cancel();
            });
        }
    },
};

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
    addUploadingFile: (state, file) => {
        // this loading is difrrent from the regular axios loading
        state.isLoading = false;

        const index =
            state.loadingFiles.length > 0
                ? state.loadingFiles.findIndex(
                      (loadingFile) => loadingFile.uploadId === file.uploadId
                  )
                : -1;

        if (index === -1) {
            state.loadingFiles.push({ ...file });
        } else {
            state.loadingFiles[index].progress = file.progress;
        }
    },
    removeUploadingFile: (state, uploadId) => {
        const index =
            state.loadingFiles.length > 0
                ? state.loadingFiles.findIndex(
                      (loadingFile) => loadingFile.uploadId === uploadId
                  )
                : -1;
        state.loadingFiles.splice(index, 1);
    },
    removeUploadingFiles: (state) => (state.loadingFiles = []),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
