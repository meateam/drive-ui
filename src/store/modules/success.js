const state = {
    success: undefined,
};

const getters = {
    success: (state) => state.success,
};

const mutations = {
    onSuccess: (state, success) => { state.success = success },
};

export default {
    state,
    getters,
    mutations,
};
