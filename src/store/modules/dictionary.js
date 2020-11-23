const state = {
    usersDictionary: {},
};

const getters = {
    usersDictionary: (state) => state.usersDictionary,
};


const mutations = {
    addUserToictionary: (state, user) => {
        const users = state.usersDictionary;
        users[user.id] = user;
        
        state.usersDictionary = users;
    }
};

export default {
    state,
    getters,
    mutations,
};
