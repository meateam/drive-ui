import i18n from "@/i18n";
import { advancedSearch } from "@/api/search";
import { getNetworkItemByAppId } from "@/utils/networkDest";
import { isFileOwner, getFileOwnerName, getExternalFileOwnerName } from "@/utils/formatFile";

const actions = {
  async fetchSearchFiles({ dispatch, commit }, { query, pageNum, pageAmount, isAppend }) {
    try {
      const tempResults = await advancedSearch(query, pageNum, pageAmount);
      const results = tempResults.files.map((item) => item.file);

      commit("setIsShared", true);
      commit("updatePageNum", pageNum + 1);
      isAppend ? commit("setAppendFiles", results) : commit("setFiles", results);
      commit("setServerFilesLength", tempResults.count);

      results.forEach(async (file) => {
        if (file.isExternal) {
          const networkDest = getNetworkItemByAppId(file.appID);
          const formattedFile = file;
          formattedFile.owner = await getExternalFileOwnerName(file.ownerId, networkDest.value);
          commit("updateFile", formattedFile);
        } else {
          const formattedFile = file;
          const isOwner = isFileOwner(file.ownerId);
          formattedFile.owner = isOwner ? i18n.t("me") : await getFileOwnerName(file.ownerId);
          commit("updateFile", formattedFile);
        }
      });
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

export default { actions };
