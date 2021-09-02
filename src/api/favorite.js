import Axios from "axios";
import { baseURL } from "@/config";
import store from "@/store";

export async function fetchFavFiles() {
    try {
        const result = await Axios.get(`${baseURL}/api/files/fav`)
        if (result.data.files === null) return []
        return result.data.files.SuccessfulFileIDs;
    } catch (err) {
        store.dispatch("onError", err);
    }
}

export async function addFavorite({ fileID }) {
    try {
        await Axios.post(`${baseURL}/api/fav/${fileID}?appId=drive`)
    } catch (err) {
        store.dispatch("onError", err);
    }
}

export async function deleteFavorite({ fileID }) {
    try {
        await Axios.delete(`${baseURL}/api/fav/${fileID}`)
    } catch (err) {
        store.dispatch("onError", err);
    }
}

export async function getAllFavorites() {
    const res = await Axios.get(`${baseURL}/api/fav`)
    const favFiles = res.data
    return favFiles
}