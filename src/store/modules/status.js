import { fetchStatusTransferdFiles } from "@/api/files";

const state = {
  outcomingTransfers: [],
};

const getters = {
  outcomingTransfers: (state) => state.outcomingTransfers,
};

const actions = {
  async getOutcomingTransfers({ commit }) {
    const status = await fetchStatusTransferdFiles();
    commit("setOutcomingTransfers", status);
  },
};

const mutations = {
  setOutcomingTransfers: (state, outcomingTransfers) => {
    state.outcomingTransfers = outcomingTransfers;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
