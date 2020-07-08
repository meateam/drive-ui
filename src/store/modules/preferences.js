const state = {
    fileView: window.localStorage.getItem("fileView") || "0"
};

const getters = {
    fileView: (state) => state.fileView,
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
};

export default {
    state,
    getters,
    actions,
    mutations,
};
