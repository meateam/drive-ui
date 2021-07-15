import Axios from "axios";
import { baseURL } from "@/config";
import store from "@/store";


export async function fetchFiles(parent) {
    const res = await Axios.get(`${baseURL}/api/files?appId=drive${parent ? `&parent=${parent.id}` : ""}`);
    const files = res.data;
    console.log(files)
    return files;
  }


export async function addFavorite({ fileID }) {
    await Axios.post(`${baseURL}/api/fav/${fileID}`)
}

export async function addFavorites({ files }) {
    return Promise.all(
     files.map(async (file) => {
         await addFavorite({ fileID: file.id });
     })   
    ).then(() => {
        store.commit("onSuccess", "success.Share");
    })
    .catch((err) => {
        store.dispatch("onError", err);
    })
}

export async function deleteFavorite({ fileID }) {
    await Axios.delete(`${baseURL}/api/fav/${fileID}`)
}


export async function deleteFavorites({ files }) {
    return Promise.all(
     files.forEach(async (file) => {
         await deleteFavorite({ fileID: file.id });
     })   
    ).then(() => {
        store.commit("onSuccess", "success.Share");
    })
    .catch((err) => {
        store.dispatch("onError", err);
    })
}

export async function getAllFavorites() {
    const res = await Axios.get(`${baseURL}/api/fav`)
    const favFiles = res.data
    return favFiles
}