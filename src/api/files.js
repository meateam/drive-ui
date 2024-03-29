import Axios from "axios";
import { pushUpdatedFile, removeUpdatedFile } from "@/utils/lastUpdatedFileHandler";
import { baseURL, fileTypes, pageSize } from "@/config";
import { isFolder } from "@/utils/isFolder";
import store from "@/store";

/**
 * fetchFiles fetch all the files in the current folder
 * @param parent - the parent folder id
 */
export async function fetchFiles(parent) {
  const res = await Axios.get(`${baseURL}/api/files?appId=drive${parent ? `&parent=${parent.id}` : ""}`);
  const files = res.data;
  return files;
}

/**
 * getFoldersByFolder returns all the folder childrens (with the type folder)
 * @param folderID the id of the parent
 */
export async function getFoldersByFolder(parent) {
  try {
    const res = await Axios.get(`${baseURL}/api/files?type=${fileTypes.folder}${parent ? `&parent=${parent}` : ""}`);
    return res.data;
  } catch (err) {
    store.dispatch("onError", err);
  }
}

/**
 * fetchSharedFiles fetch all the shared folders in the current parent
 * @param parent the file id of the parent
 */
export async function fetchSharedFolders(parent) {
  const res = await Axios.get(`${baseURL}/api/files?shares&appId=drive${parent ? `&parent=${parent}` : ""}`);
  const permissions = res.data.files.filter((item) => isFolder(item.type));
  return permissions;
}

/**
 * fetchSharedFiles fetch all the shared files in the current folder
 * @param pageNum - for pagination, the page number
 * @param pageAmount - for pagination, the page size
 */
export async function fetchSharedFiles(pageNum, pageAmount) {
  const res = await Axios.get(`${baseURL}/api/files?shares&appId=drive&pageSize=${pageAmount}&pageNum=${pageNum}`);
  const permissions = res.data;
  return permissions;
}

/**
 * fetchExternalTransferredFiles fetch all the external transfer files from cargo or dropbox
 * @param pageNum - for pagination, the page number
 * @param appId - appId, external sources app
 */
export async function fetchExternalTransferredFiles(pageNum, appId) {
  const res = await Axios.get(`${baseURL}/api/files?shares&appId=${appId}&pageSize=${pageSize}&pageNum=${pageNum}`);
  const permissions = res.data;
  return permissions;
}

/**
 * isFileExists checks if the file exists in the server
 * @param fileID is the id of the file
 */
export async function isFileExists(fileID) {
  try {
    const res = await Axios.get(`${baseURL}/api/files/${fileID}`);
    return !!res.data;
  } catch (err) {
    return false;
  }
}

/**
 * getFileByID get the file by it's id
 * @param fileID is the id of the file
 */
export async function getFileByID(fileID) {
  const res = await Axios.get(`${baseURL}/api/files/${fileID}`, {doNotInterfere: true});
  return res.data;
}

/**
 * deleteFile gets a file id and delete it
 * @param fileID is the id of the file to delete
 */
export async function deleteFile(fileID) {
  const res = await Axios.delete(`${baseURL}/api/files/${fileID}`);

  removeUpdatedFile(fileID);

  return res.data[0];
}

/**
 * multipartUpload create an upload with small size
 * @param file is the file that was chose by the user in the type blob
 */
export async function multipartUpload({ file, parent }, progress) {
  const source = Axios.CancelToken.source();
  const formData = new FormData();
  formData.append("file", file, file.name);
  const res = await Axios.post(
    `${baseURL}/api/upload?uploadType=multipart${parent ? `&parent=${parent.id}` : ""}`,
    formData,
    {
      onUploadProgress: (event) => {
        progress(file, event, source);
      },
      cancelToken: source.token,
      doNotInterfere: true,
    }
  );
  const metadata = await getFileByID(res.data);
  return metadata;
}

/**
 * resumableUpload is an upload for bigger files
 * @param file is the file to upload
 */
export async function resumableUpload({ file, parent }, progress) {
  const uploadID = await createResumableUpload({ file, parent });
  const source = Axios.CancelToken.source();
  const formData = new FormData();
  formData.append("file", file, file.name);
  const res = await Axios.post(
    `${baseURL}/api/upload?uploadType=resumable&uploadId=${uploadID}${parent ? `&parent=${parent.id}` : ""}`,
    formData,
    {
      headers: { "Content-Range": `bytes 0-${file.size - 1}/${file.size}` },
      onUploadProgress: (event) => {
        progress(file, event, source);
      },
      cancelToken: source.token,
      doNotInterfere: true,
    }
  );

  const metadata = await getFileByID(res.data);
  return metadata;
}

export function cancelUpload(source) {
  source.cancel();
}

/**
 * createResumableUpload is used for the resumable upload (for connecting all the pieces when the upload is finished)
 * @param file is the file to upload
 */
export async function createResumableUpload({ file, parent }) {
  const res = await Axios.post(
    `${baseURL}/api/upload${parent ? `?parent=${parent.id}` : ""}`,
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
    `${baseURL}/api/upload?uploadType=multipart${parent ? `&parent=${parent.id}` : ""}`,
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
    const ancestors = await Axios.get(`${baseURL}/api/files/${folderID}/ancestors`);
    const breadcrumbs = ancestors ? ancestors.data : [];
    return breadcrumbs;
  } catch (err) {
    store.dispatch("onError", err);
  }
}

export async function editFile({ file, name }) {
  const res = await Axios.put(`${baseURL}/api/files/${file.id}`, {
    name,
  });
  if (res.data) throw new Error(res.data.error);

  pushUpdatedFile(file.id);

  return { file, name };
}

export async function editOnline(fileID) {
  pushUpdatedFile(fileID);
  window.open(`${store.state.configuration.docsUrl}/api/files/${fileID}`);
}

export async function editLocally(fileID) {
  pushUpdatedFile(fileID);
  window.open(`${store.state.configuration.localOfficeUrl}/api/localoffice/${fileID}`);
}

export function getFileLink(file) {
  if (fileTypes.office.includes(file.type)) {
    return `${store.state.configuration.docsUrl}/api/files/${file.id}`;
  } else if (isFolder(file.type)) {
    return `https://${window.location.hostname}/folders?id=${file.id}`;
  } else {
    return `https://${window.location.hostname}/api/files/${file.id}?alt=media`;
  }
}

export function createNewFile({ name, type, parent }) {
  window.open(
    `${store.state.configuration.docsUrl}/api/blank?name=${name}&type=${type}${parent ? `&parent=${parent.id}` : ""}`
  );
  location.reload();
}

export async function moveFiles({ folderID, fileIDs }) {
  const res = await Axios.put(`${baseURL}/api/files`, {
    partialFile: {
      parent: folderID ? folderID : "",
    },
    idList: fileIDs,
  });

  return res.data;
}

export function getPreview(fileID) {
  return `${baseURL}/api/files/${fileID}?alt=media&inline=true`;
}

export function getPdfPreview(fileID) {
  return `${baseURL}/api/files/${fileID}?alt=media&preview`;
}
