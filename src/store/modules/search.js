import { search } from "@/api/search";
import { isFileOwner, getFileOwnerName, getExternalFileOwnerName } from "@/utils/formatFile";

const actions = {
  async fetchSearchFiles({ dispatch, commit }, query) {
    try {
      const results = await search(query);
      commit("setFiles", results);

      results.forEach(async (file) => {
        if (file.isExternal) {
          const formattedFile = file
          formattedFile.owner = await getExternalFileOwnerName(file.ownerId);
          commit("updateFile", formattedFile);
        } else {
          const formattedFile = file;
          const isOwner = isFileOwner(file.ownerId);
          formattedFile.owner = isOwner ? "אני" : await getFileOwnerName(file.ownerId);
          commit('updateFile', formattedFile);
        }
      })
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

export default { actions };
