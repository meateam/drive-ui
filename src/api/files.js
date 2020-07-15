import Axios from "axios";
import store from '@/store';
import { baseURL, fileTypes } from "@/utils/config";

/**
 * fetchFiles fetch all the files in the current folder
 */
export async function fetchFiles(parent) {
    const res = await Axios.get(
        `${baseURL}/api/files${
        parent ? `?parent=${parent.id}` : ""
        }`
    );
    const files = res.data;
    return files;
}

/**
 * getFoldersByFolder returns all the folder childrens (with the type folder)
 * @param folderID the id of the parent
 */
export async function getFoldersByFolder(parent) {
    try {
        const res = await Axios.get(
            `${baseURL}/api/files?type=${fileTypes.folder}${
            parent ? `&parent=${parent}` : ""
            }`
        );
        return res.data;
    } catch (err) {
        store.dispatch("onError", err);
    }
}


/**
 * fetchSharedFiles fetch all the shared files in the current folder
 */
export async function fetchSharedFiles() {

    const res = await Axios.get(`${baseURL}/api/files?shares`);
    const files = res.data;
    return files;
}

export async function getFileByID(fileID) {

    const res = await Axios.get(`${baseURL}/api/files/${fileID}`);
    return res.data;
}

/**
 * deleteFile gets a file id and delete it
 * @param fileID is the id of the file to delete
 */
export async function deleteFile(fileID) {

    const res = await Axios.delete(`${baseURL}/api/files/${fileID}`);
    return res.data[0];
}


/**
 * multipartUpload create an upload with small size
 * @param file is the file that was chose by the user in the type blob
 */
export async function multipartUpload({ file, parent }) {

    const formData = new FormData();
    formData.append("file", file, file.name);
    const res = await Axios.post(`${baseURL}/api/upload?uploadType=multipart${
        parent ? `&parent=${parent.id}` : ""
        }`, formData, {
        onUploadProgress: event => {
            store.commit('addLoadingFile', { name: file.name, progress: Math.round((100 * event.loaded) / event.total) });
        }
    });
    const metadata = await getFileByID(res.data);
    return metadata;
}

/**
 * resumableUpload is an upload for bigger files
 * @param file is the file to upload
 */
export async function resumableUpload({ file, parent }) {

    const uploadID = await getUploadID({ file, parent });

    const formData = new FormData();
    formData.append("file", file, file.name);
    const res = await Axios.post(`${baseURL}/api/upload?uploadType=resumable&uploadId=${uploadID}${
        parent ? `&parent=${parent.id}` : ""
        }`, formData, {
        headers: { "Content-Range": `bytes 0-${file.size - 1}/${file.size}` },
        onUploadProgress: event => {
            store.commit('addLoadingFile', { name: file.name, progress: Math.round((100 * event.loaded) / event.total) });
        }
    });

    const metadata = await getFileByID(res.data);
    return metadata;
}


/**
 * getUploadID is used for the resumable upload (for connecting all the pieces when the upload is finished)
 * @param file is the file to upload
 */
export async function getUploadID({ file, parent }) {
    const res = await Axios.post(
        `${baseURL}/api/upload${
        parent ? `?parent=${parent.id}` : ""
        }`,
        {
            title: file.name,
            mimeType: file.type,
        },
        {
            headers: {
                "content-type": "application/json",
                "X-Content-Length": `${file.size}`,
            },
        }
    );
    return res.headers["x-uploadid"];
}

/**
 * downloadFile downloads the file with the
 * @param fileID is the id of the file to download
 */
export function downloadFile(fileID) {
    window.open(`${baseURL}/api/files/${fileID}?alt=media`, "_blank");
}

/**
 * uploadFolder in the current folder
 * @param name is the name of the folder
 */
export async function uploadFolder({ name, parent }) {

    const res = await Axios.post(
        `${baseURL}/api/upload?uploadType=multipart${
        parent ? `&parent=${parent.id}` : ""
        }`,
        {},
        {
            headers: {
                "Content-Type": fileTypes.folder,
                "Content-Disposition": `filename=${encodeURIComponent(name)}`,
            },
        }
    );

    const folder = await getFileByID(res.data);
    return folder;
}

export async function getFolderHierarchy(folderID) {
    try {
        const ancestors = await Axios.get(
            `${baseURL}/api/files/${folderID}/ancestors`
        );
        const breadcrumbs = ancestors ? ancestors.data : [];
        return breadcrumbs;
    } catch (err) {
        store.dispatch("onError", err)
    }

}

export async function editFile({ file, name }) {
    const res = await Axios.put(`${baseURL}/api/files/${file.id}`, {
        name,
    });
    if (res.data) throw new Error(res.data.error);
    return { file, name };
}

export async function editOnline(fileID) {
    window.open(`${store.state.configuration.onlineEditorUrl}/${fileID}/operation=edit`)
}

export async function moveFile({ folderID, fileIDs }) {

    const res = await Axios.put(`${baseURL}/api/files`, {
        partialFile: {
            parent: folderID,
        },
        idList: fileIDs,
    });
    return res;
}

export function getPreview(fileID) {
    return `${baseURL}/api/files/${fileID}?alt=media&inline=true`;
}

export function getPdfPreview(fileID) {
    return `${baseURL}/api/files/${fileID}?alt=media&preview`;
}