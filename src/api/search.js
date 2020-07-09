import Axios from "axios";
import store from '@/store';
import { baseURL } from "@/utils/config";

export async function search(query) {
    try {
        const res = await Axios.get(
            `${baseURL}/api/search?q=${encodeURIComponent(query)}`
        );
        return res.data || [];
    } catch (err) {
        store.commit("onError", err);
    }
}