import { baseURL } from "@/utils/config";
import Axios from "axios";

export async function fetchQuota() {
    const res = await Axios.get(`${baseURL}/api/user/quota`);
    return res.data;
}