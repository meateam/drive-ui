const state = {
    isLoading: false,
    loadingFiles: []
};

const getters = {
    isLoading: (state) => state.isLoading,
    loadingFiles: (state) => state.loadingFiles
};

const mutations = {
    setLoading: (state, isLoading) => {
        if (state.loadingFiles.length) return;
        state.isLoading = isLoading
    },
    addLoadingFile: (state, fileName) => (state.loadingFiles.push(fileName)),
    removeLoadingFile: (state, fileName) => (state.loadingFiles = state.loadingFiles.filter(name => name !== fileName))
};

export default {
    state,
    getters,
    mutations,
};
