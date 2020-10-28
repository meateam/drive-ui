import { search } from "@/api/search";
import { isFileOwner, getFileOwnerName, getExternalFileOwnerName } from "@/utils/formatFile";

const actions = {
  async fetchSearchFiles({ dispatch, commit }, query) {
    try {
      commit("resetFiles");
      const results = await search(query);

      results.forEach(async (file) => {
        if (file.isExternal) {
          file.owner = "???";
          commit("addFile", file);

          const formattedFile = file
          formattedFile.owner = await getExternalFileOwnerName(file.ownerId);
          commit("updateFile", formattedFile);
        } else {
          const isOwner = isFileOwner(file.ownerId)
          file.owner = isOwner ? "אני" : "???";
          commit("addFile", file);

          if (!isOwner) {
            const formattedFile = file;
            formattedFile.owner = await getFileOwnerName(file.ownerId);
            commit('updateFile', formattedFile);
          }
        }
      })
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

export default { actions };
