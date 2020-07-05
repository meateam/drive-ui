import { baseURL } from "@/utils/config";
import Axios from "axios";

export async function fetchQuota() {
    try {
        const res = await Axios.get(`${baseURL}/api/user/quota`);
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
}