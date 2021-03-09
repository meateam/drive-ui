import * as filesApi from "@/api/files";
import { getFileOwnerName } from "@/utils/formatFile";

const state = {
  items: [],
  itemsLength: undefined,
};

const getters = {
  items: (state) => state.items,
  itemsLength: (state) => state.itemsLength,
};

const actions = {
  async fetchTransferdStatus({ commit, dispatch }) {
    try {
      const transfers = await filesApi.fetchStatusTransferdFiles();
      let outcomingTransfersFiles = [];

      if (transfers) {
        await Promise.all(
          transfers.map(async (transferInfo) => {
            let file;
            try {
              file = await filesApi.getFileByID(transferInfo.fileID);
              transferInfo.file = file;
            } catch (error) {
              transferInfo.file = {};
              transferInfo.file.name = transferInfo.fileName;
              transferInfo.file.isDeleted = true;
            }

            transferInfo.file.isReadOnly = true;
            transferInfo.file.owner = await getFileOwnerName(transferInfo.fileOwnerID);
            outcomingTransfersFiles.push(transferInfo);
          })
        );
      }
      commit("setItems", outcomingTransfersFiles);
      commit("setItemsLength", outcomingTransfersFiles.itemCount);
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

const mutations = {
  setItems: (state, items) => {
    state.itemsLength = undefined;
    state.items = items;
  },
  setItemsLength: (state, itemCount) => {
    state.itemsLength = itemCount;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
