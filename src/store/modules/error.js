const state = {
    error: undefined,
};

const getters = {
    error: (state) => state.error,
};

const mutations = {
    createError: (state, error) => (state.error = error),
};

export default {
    state,
    getters,
    mutations,
};
