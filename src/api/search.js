import Axios from "axios";
import { baseURL } from "@/config";

export async function search(query) {
    const res = await Axios.get(
        `${baseURL}/api/search?q=${encodeURIComponent(query)}`
    );
    return res.data || [];
}