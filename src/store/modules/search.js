import { search } from '@/api/search';
import { isFileOwner, getFileOwnerName, getExternalFileOwnerName } from '@/utils/formatFile';

const actions = {
  async fetchSearchFiles({ dispatch, commit, rootState }, query) {
    try {
      const results = await search(query);
      commit('setFiles', results);

      results.forEach(async (file) => {
        if (file.isExternal) {
          const networkDest = rootState.configuration.externalNetworkDests.filter(
            (networkDest) => networkDest.appId == file.appId
          )[0];
          const formattedFile = file;
          formattedFile.owner = await getExternalFileOwnerName(file.ownerId, networkDest.value);
          commit('updateFile', formattedFile);
        } else {
          const formattedFile = file;
          const isOwner = isFileOwner(file.ownerId);
          formattedFile.owner = isOwner ? 'אני' : await getFileOwnerName(file.ownerId);
          commit('updateFile', formattedFile);
        }
      });
    } catch (err) {
      dispatch('onError', err);
    }
  },
};

export default { actions };
