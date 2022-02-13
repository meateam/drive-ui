const state = {
  isPopupOpen: false,
};

const getters = {
  isPopupOpen: (state) => state.isPopupOpen,
};

const mutations = {
  changePopupStatus: (state) => (state.isPopupOpen = !state.isPopupOpen),
};

export default {
  state,
  getters,
  mutations,
};