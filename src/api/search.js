import { baseURL } from "@/utils/config";
import Axios from "axios";


export async function search(query) {
    try {
        const res = await Axios.get(
            `${baseURL}/api/search?q=${encodeURIComponent(query)}`
        );
        return res.data || [];
    } catch (err) {
        throw new Error(err);
    }
}