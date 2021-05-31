import Axios from "axios";
import { baseURL, pageSizeAdvancedSearch } from "@/config";
import { isJson } from "@/utils/isJson";

// default search - search by fileName
export async function search(query) {
  const res = await Axios.get(`${baseURL}/api/search?q=${encodeURIComponent(query)}`);
  return res.data || [];
}

// advanced search - search by multiple attributes
export async function advancedSearch(query, pageNum = 0, pageSize = pageSizeAdvancedSearch) {
  // Check if json. if not, set to default search query (filename)
  let bodyQuery = isJson(query);
  if (!bodyQuery) {
    bodyQuery = { fileName: query };
  }

  if ("date" in bodyQuery) {
    const dateQuery = {
      start: new Date(bodyQuery.date[0]).setHours(0, 0, 0, 0),
      end: new Date(bodyQuery.date.length > 1 ? bodyQuery.date[1] : bodyQuery.date[0]).setHours(23, 59, 59, 999),
    };
    bodyQuery.createdAt = dateQuery;
    bodyQuery.updatedAt = dateQuery;
  }
  const res = await Axios.post(`${baseURL}/api/search/advanced`, {
    fields: bodyQuery,
    amount: {
      from: pageNum * pageSize,
      amount: pageSize,
    },
  });
  return res.data || [];
}
