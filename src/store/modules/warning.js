const state = {
    warning: undefined,
};

const getters = {
    warning: (state) => state.warning,
};

const mutations = {
    onWarning: (state, warning) => { state.warning = warning },
};

export default {
    state,
    getters,
    mutations,
};
