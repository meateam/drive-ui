import * as transferApi from "@/api/transfer";
import * as fileApi from "@/api/files";
import { getFileOwnerName } from "@/utils/formatFile";

const state = {
  transfers: [],
  transfersLength: undefined,
};

const getters = {
  transfers: (state) => state.transfers,
  transfersLength: (state) => state.transfersLength,
};

const actions = {
  async fetchTransferredStatus({ commit, dispatch }, { pageNum }) {
    try {
      const transfers = await transferApi.fetchStatusTransferredFiles(pageNum || 0);
      let outcomingTransfersFiles = [];

      if (transfers.transfersInfo) {
        for (const transferInfo of transfers.transfersInfo) {
          let file;

          try {
            file = await fileApi.getFileByID(transferInfo.fileID);
            transferInfo.file = file;
          } catch (error) {
            transferInfo.file = {};
            transferInfo.file.name = transferInfo.fileName;
            transferInfo.file.isDeleted = true;
          }

          transferInfo.file.status = transferInfo.status;
          transferInfo.file.transferId = transferInfo.id;
          transferInfo.file.isReadOnly = true;

          outcomingTransfersFiles.push(transferInfo);
        }
      }

      commit("setTransfers", outcomingTransfersFiles);
      commit("setTransfersLength", transfers.itemCount);

      if (transfers.transfersInfo) {
        for (const transferInfo of transfers.transfersInfo) {
          transferInfo.file.owner = await getFileOwnerName(transferInfo.fileOwnerID);
          commit("updateItem", transferInfo);
        }
      }
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

const mutations = {
  setTransfers: (state, transfers) => {
    state.transfersLength = undefined;
    state.transfers = transfers;
  },
  setTransfersLength: (state, itemCount) => {
    state.transfersLength = itemCount;
  },
  updateItem: (state, updateItem) => {
    const updatedTransfers = state.transfers.map((transfer) => {
      if (transfer.id === updateItem.id) return updateItem;

      return transfer;
    });

    state.transfers = updatedTransfers;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
