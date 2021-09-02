import * as transferApi from "@/api/transfer";
import * as fileApi from "@/api/files";
import { getFileOwnerName } from "@/utils/formatFile";

const state = {
  currentMailOrT: "",
  transfers: [],
  transfersLength: undefined,
};

const getters = {
  currentMailOrT: (state) => state.currentMailOrT,
  transfers: (state) => state.transfers,
  transfersLength: (state) => state.transfersLength,
};

const actions = {
  async fetchTransferredStatus({ commit, dispatch }, { pageNum }) {
    try {
      const transfers = await transferApi.fetchStatusTransferredFiles(pageNum || 0);
      const transfersLength = transfers.itemCount;
      const outcomingTransfersFiles = [];
      const handleTransfers = () => {
        commit("setTransfers", outcomingTransfersFiles);
        commit("setTransfersLength", transfersLength);
      };

      handleTransfers();
      if (transfers.transfersInfo) {
        await Promise.all(
          transfers.transfersInfo.map(async (transferInfo) => {
            try {
              let file = await fileApi.getFileByID(transferInfo.fileID);
              transferInfo.file = file;

              const ownerName = await getFileOwnerName(transferInfo.fileID);
              transferInfo.file.owner = ownerName;
            } catch (error) {
              transferInfo.file = {};
              transferInfo.file.name = transferInfo.fileName;
              transferInfo.file.isDeleted = true;
              transferInfo.file.owner = "???";
            }

            transferInfo.file.status = transferInfo.status;
            transferInfo.file.transferId = transferInfo.id;
            transferInfo.file.isReadOnly = true;

            outcomingTransfersFiles.push(transferInfo);
            handleTransfers();
          })
        );
      }
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

const mutations = {
  setCurrentMailOrT: (state, currentMailOrT) => {
    state.currentMailOrT = currentMailOrT;
  },
  setTransfers: (state, transfers) => {
    state.transfersLength = undefined;
    state.transfers = transfers;
  },
  setTransfersLength: (state, itemCount) => {
    state.transfersLength = itemCount;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
