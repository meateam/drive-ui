import Axios from "axios";
import { baseURL } from "@/config";
import store from "@/store";

export async function fetchFavFiles() {
    try {
        const res = await Axios.get(`${baseURL}/api/files/fav`)
        if (res.data.files !== null && res.data.files.successful !== null) store.dispatch("updateFetchedFiles", res.data.files.successful)
    } catch (err) {
        store.dispatch("onError", err);
    }
}

export async function addFavorite(file) {
    try {
        await Axios.post(`${baseURL}/api/fav/${file.id}?appId=drive`)
        store.commit("onSuccess", "success.AddFavorite")
        file.isFavorite = true;
    } catch (err) {
        store.dispatch("onError", err);
    }
}

export async function deleteFavorite(file) {
    try {
        await Axios.delete(`${baseURL}/api/fav/${file.id}`)
        store.commit("onSuccess", "success.RemoveFavorite")
        file.isFavorite = false;
    } catch (err) {
        store.dispatch("onError", err);
    }
}

export async function getAllFavorites() {
    const res = await Axios.get(`${baseURL}/api/fav`)
    const favFiles = res.data
    return favFiles
}