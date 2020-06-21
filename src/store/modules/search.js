/* eslint-disable no-empty-pattern */
import { baseURL } from "@/utils/config";
import Axios from "axios";

const actions = {
  async search({}, query) {
    const res = await Axios.get(
      `${baseURL}/api/search?q=${encodeURIComponent(query)}`
    );
    return res.data || [];
  },
};

export default {
  actions,
};
