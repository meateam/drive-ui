import Axios from "axios";
import { baseURL, pageSizeSmaller } from "@/config";

/**
 * fetchStatusTransferredFiles fetch all the status external transfer files to cargo or dropbox
 * @param pageNum - for pagination, the page number
 */
export async function fetchStatusTransferredFiles(pageNum) {
  const res = await Axios.get(`${baseURL}/api/transfersInfo?pageSize=${pageSizeSmaller}&pageNum=${pageNum}`);
  const statusTransferred = res.data;
  return statusTransferred;
}
