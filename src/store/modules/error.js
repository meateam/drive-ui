import Axios from "axios";

const state = {
    error: undefined,
};

const getters = {
    error: (state) => state.error,
};

const actions = {
    onError({ commit }, error) {
        if (!Axios.isCancel(error)) {
            commit("removeLoadingFiles");
            commit("setError", error);
        }
        commit("setLoading", false);
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
