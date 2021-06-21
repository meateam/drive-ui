import { search } from "@/api/search";
import { isFileOwner, getFileOwnerName, getExternalFileOwnerName } from "@/utils/formatFile";
import { getNetworkItemByAppId } from "@/utils/networkDest";
import i18n from "@/i18n";

const actions = {
  async fetchSearchFiles({ dispatch, commit }, query) {
    try {
      const results = await search(query);
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
