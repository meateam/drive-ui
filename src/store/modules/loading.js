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
    addLoadingFile: (state, file) => {
        // this loading is difrrent from the regular axios loading
        state.isLoading = false;

        if (!state.loadingFiles.includes[file]) {
            state.loadingFiles.push(file);
        } else {
            const index = state.loadingFiles.findIndex((item => item.name == file.name));
            state.loadingFiles[index].progress = file.progress;
        }
    },
    removeLoadingFile: (state, fileName) => (state.loadingFiles = state.loadingFiles.filter(file => file.name !== fileName)),
    removeLoadingFiles: (state) => (state.loadingFiles = [])
};

export default {
    state,
    getters,
    mutations,
};
