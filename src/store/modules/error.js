const state = {
    error: undefined,
};

const getters = {
    error: (state) => state.error,
};

const actions = {
    onError({ commit }, error) {
        commit("removeLoadingFiles");
        commit("setLoading", false);
        commit("setError", error);
    }
}

const mutations = {
    setError: (state, error) => (state.error = error),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
