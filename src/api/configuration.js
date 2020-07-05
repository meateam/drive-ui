import Axios from "axios";
import { baseURL } from "@/utils/config";

export async function fetchConfig() {
    try {
        const res = await Axios.get(`${baseURL}/api/config`);
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
}