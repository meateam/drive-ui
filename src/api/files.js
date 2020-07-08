import Axios from "axios";
import store from '@/store';
import { baseURL } from "@/utils/config";

/**
 * fetchFiles fetch all the files in the current folder
 */
export async function fetchFiles(parent) {
    try {
        const res = await Axios.get(
            `${baseURL}/api/files${
            parent ? `?parent=${parent.id}` : ""
            }`
        );
        const files = res.data;
        return files;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * getFoldersByFolder returns all the folder childrens (with the type folder)
 * @param folderID the id of the parent
 */
export async function getFoldersByFolder(parent) {
    try {
        const res = await Axios.get(
            `${baseURL}/api/files?type=${store.state.files.folderContentType}${
            parent ? `&parent=${parent}` : ""
            }`
        );
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
}


/**
 * fetchSharedFiles fetch all the shared files in the current folder
 */
export async function fetchSharedFiles() {
    try {
        const res = await Axios.get(`${baseURL}/api/files?shares`);
        const files = res.data;
        return files;
    } catch (err) {
        throw new Error(err);
    }
}

export async function getFileByID(fileID) {
    try {
        const res = await Axios.get(`${baseURL}/api/files/${fileID}`);
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * deleteFile gets a file id and delete it
 * @param fileID is the id of the file to delete
 */
export async function deleteFile(fileID) {
    try {
        const res = await Axios.delete(`${baseURL}/api/files/${fileID}`);
        return res.data[0];
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * multipartUpload create an upload with small size
 * @param file is the file that was chose by the user in the type blob
 */
export async function multipartUpload({ file, parent }) {
    try {
        const formData = new FormData();
        formData.append("file", file, file.name);
        const res = await Axios.post(`${baseURL}/api/upload?uploadType=multipart${
            parent ? `&parent=${parent.id}` : ""
            }`, formData);
        const metadata = await getFileByID(res.data);
        return metadata;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * resumableUpload is an upload for bigger files
 * @param file is the file to upload
 */
export async function resumableUpload(file, parent) {
    try {
        const uploadID = await getUploadID(file, parent);

        const formData = new FormData();
        formData.append("file", file, file.name);
        const res = await Axios.post(`${baseURL}/api/upload?uploadType=resumable&uploadId=${uploadID}${
            parent ? `&parent=${parent.id}` : ""
            }`, formData, { headers: { "Content-Range": `bytes 0-${file.size - 1}/${file.size}` } });
        const metadata = await getFileByID(res.data);
        return metadata;
    } catch (err) {
        throw new Error(err);
    }
}


/**
 * getUploadID is used for the resumable upload (for connecting all the pieces when the upload is finished)
 * @param file is the file to upload
 */
export async function getUploadID(file, parent) {
    try {
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
    } catch (err) {
        throw new Error(err);
    }
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
    try {
        const res = await Axios.post(
            `${baseURL}/api/upload?uploadType=multipart${
            parent ? `&parent=${parent.id}` : ""
            }`,
            {},
            {
                headers: {
                    "Content-Type": store.state.files.folderContentType,
                    "Content-Disposition": `filename=${encodeURIComponent(name)}`,
                },
            }
        );

        const folder = await getFileByID(res.data);
        return folder;
    } catch (err) {
        throw new Error(err);
    }
}

export async function getFolderHierarchy(folderID) {
    try {
        const ancestors = await Axios.get(
            `${baseURL}/api/files/${folderID}/ancestors`
        );
        const breadcrumbs = ancestors ? ancestors.data : [];
        return breadcrumbs;
    } catch (err) {
        throw new Error(err)
    }
}

export async function editFile({ file, name }) {
    try {
        const res = await Axios.put(`${baseURL}/api/files/${file.id}`, {
            name,
        });
        if (res.data) throw new Error(res.data.error);
        return { file, name };
    } catch (err) {
        throw new Error(err);
    }
}

export async function moveFile({ folderID, fileIDs }) {
    try {
        const res = await Axios.put(`${baseURL}/api/files`, {
            partialFile: {
                parent: folderID,
            },
            idList: fileIDs,
        });
        console.log(res)
        return;
    } catch (err) {
        throw new Error(err);
    }
}

export function getImagePreview(fileID) {
    return `${baseURL}/api/files/${fileID}?alt=media&inline=true`;
}

export function getPdfPreview(fileID) {
    return `${baseURL}/api/files/${fileID}?alt=media&preview`;
}