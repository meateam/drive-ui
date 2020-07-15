import { search } from "@/api/search";

const actions = {
    async fetchSearchFiles({ dispatch, commit }, query) {
        try {
            const results = await search(query);
            commit("setFiles", results);
        } catch (err) {
            dispatch("onError", err);
        }
    },
};

export default { actions };
