import Axios from "axios";
import { baseURL, pageSizeSmaller } from "@/config";

/**
 * fetchStatusTransferdFiles fetch all the status external transfer files to cargo or dropbox
 * @param pageNum - for pagination, the page number
 */
export async function fetchStatusTransferdFiles(pageNum) {
  const res = await Axios.get(`${baseURL}/api/transfersInfo?pageSize=${pageSizeSmaller}&pageNum=${pageNum}`);
  const statusTransferd = res.data;
  return statusTransferd;
}
