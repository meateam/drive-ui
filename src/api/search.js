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

  // Handle date field
  if ("date" in bodyQuery) {
    let date1 = new Date(bodyQuery.date[0]);
    let date2 = bodyQuery.date.length > 1 ? new Date(bodyQuery.date[1]) : date1;

    const dateQuery = {
      start: (date1 <= date2 ? date1 : date2).setHours(0, 0, 0, 0),
      end: (date2 > date1 ? date2 : date1).setHours(23, 59, 59, 999),
    };

    bodyQuery.createdAt = dateQuery;
    bodyQuery.updatedAt = dateQuery;
  }

  let exactMatch = false;
  if ("exactMatch" in bodyQuery) {
    exactMatch = bodyQuery.exactMatch;
    delete bodyQuery["exactMatch"];
  }

  if (Object.keys(bodyQuery).length > 0) {
    const res = await Axios.post(`${baseURL}/api/search/advanced`, {
      fields: bodyQuery,
      amount: {
        from: pageNum * pageSize,
        amount: pageSize,
      },
      exactMatch,
    });

    return { files: res.data.files || [], count: res.data.itemCount };
  }

  return { files: [], count: 0 };
}
