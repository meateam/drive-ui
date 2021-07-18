import Axios from "axios";
import { baseURL } from "@/config";
import store from "@/store";
// import * as filesApi from "@/api/files";


export async function fetchFavFiles(parent) {

    
    // console.log(parent)
    // const filtered = []
    // const result = await Axios.get(`${baseURL}/api/fav`)
    // result.data.favFileIDList.forEach(async(fav) => {
    //     const result = await filesApi.getFileByID(fav.fileID)
    //     console.log(result)
    //     filtered.push(result)
    // })
    
    // console.log(filtered)
    // return filtered;

    const res = await Axios.get(`${baseURL}/api/files?appId=drive${parent ? `&parent=${parent.id}` : ""}`);
    const files = res.data;
    const filteredFiles = []
    files.forEach((file) => {
        if (file.isFavorite) {
            filteredFiles.push(file)
        }
    });

    return filteredFiles;

    
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