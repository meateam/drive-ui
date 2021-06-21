import * as transferApi from "@/api/transfer";
import * as fileApi from "@/api/files";
import { getFileOwnerName } from "@/utils/formatFile";

const state = {
  currentMailOrT: '',
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

      if (transfers.transfersInfo) {
          await Promise.all(
              transfers.transfersInfo.map(async (transferInfo) => {
                  const [file, ownerName] = await Promise.all([
                      fileApi.getFileByID(transferInfo.fileID).catch((_err) => {
                          transferInfo.file = {};
                          transferInfo.file.name = transferInfo.fileName;
                          transferInfo.file.isDeleted = true;
                      }),
                      getFileOwnerName(transferInfo.fileOwnerID),
                  ]);

                  transferInfo.file = file;
                  transferInfo.file.owner = ownerName;

                  transferInfo.file.status = transferInfo.status;
                  transferInfo.file.transferId = transferInfo.id;
                  transferInfo.file.isReadOnly = true;

                  outcomingTransfersFiles.push(transferInfo);
                  handleTransfers();
              })
          );
      } else {
          handleTransfers();
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
