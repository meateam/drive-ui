const state = {
    isLoading: false
};

const getters = {
    isLoading: (state) => state.isLoading,
};


const mutations = {
    setLoading: (state, isLoading) => {
        state.isLoading = isLoading;
    },
};

export default {
    state,
    getters,
    mutations,
};
