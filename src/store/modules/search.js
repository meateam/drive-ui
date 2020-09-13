import { search } from "@/api/search";
import { formatFile, formatExternalFile } from "@/utils/formatFile";

const actions = {
  async fetchSearchFiles({ dispatch, commit }, query) {
    try {
      const results = await search(query);
      commit(
        "setFiles",
        await Promise.all(
          results.map((file) => {
            return file.isExternal
              ? formatExternalFile(file)
              : formatFile(file);
          })
        )
      );
    } catch (err) {
      dispatch("onError", err);
    }
  },
};

export default { actions };
