import Axios from "axios";
import { baseURL } from "@/config";

export async function fetchQuota() {
    const res = await Axios.get(`${baseURL}/api/user/quota`);
    return res.data;
}