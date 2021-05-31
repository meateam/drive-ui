import { advancedSearch } from "@/api/search";
import { isFileOwner, getFileOwnerName, getExternalFileOwnerName } from "@/utils/formatFile";
import { getNetworkItemByAppId } from "@/utils/networkDest";
import { pageSize } from "@/config";

const actions = {
  async fetchSearchFiles({ dispatch, commit }, { query, pageNum }) {
    try {
      const tempResults = await advancedSearch(query, pageNum, pageSize);
      const results = tempResults.map((item) => item.file);
      commit("setFiles", results);

      results.forEach(async (file) => {
        if (file.isExternal) {
          const networkDest = getNetworkItemByAppId(file.appId);
          const formattedFile = file;
          formattedFile.owner = await getExternalFileOwnerName(file.ownerId, networkDest.value);
          commit("updateFile", formattedFile);
        } else {
          const formattedFile = file;
          const isOwner = isFileOwner(file.ownerId);
          formattedFile.owner = isOwner ? "אני" : await getFileOwnerName(file.ownerId);
          commit("updateFile", formattedFile);
        }
      });
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

export default { actions };
