import Axios from "axios";
import { baseURL } from "@/config";
import store from "@/store";

export async function fetchFavFiles() {
    try {
        const result = await Axios.get(`${baseURL}/api/files/fav`)
        return result.data.files && result.data.files.SuccessfulFileIDs ? result.data.files.SuccessfulFileIDs : [];
    } catch (err) {
        store.dispatch("onError", err);
    }
}

export async function addFavorite(fileIdObject) {
    try {
        await Axios.post(`${baseURL}/api/fav/${fileIdObject.fileID}?appId=drive`)
    } catch (err) {
        store.dispatch("onError", err);
    }
}

export async function deleteFavorite(fileIdObject) {
    try {
        await Axios.delete(`${baseURL}/api/fav/${fileIdObject.fileID}`)
    } catch (err) {
        store.dispatch("onError", err);
    }
}

export async function getAllFavorites() {
    const res = await Axios.get(`${baseURL}/api/fav`)
    const favFiles = res.data
    return favFiles
}