import * as filesApi from "@/api/files";
import router from "@/router";

function isFileInLocation(currentFolderID, folderID) {
  return (
    (currentFolderID === undefined && router.name === "MyDrive") ||
    (router.name === "Folders" && folderID === currentFolderID)
  );
}

const actions = {
  async SOCKET_FILE_ADD({ rootState, dispatch }, data) {
    const currentFolderID = rootState.files.currentFolder.id;

    if (isFileInLocation(currentFolderID, data.folderID)) {
      const file = await filesApi.getFileByID(data.fileID);
      await dispatch("addFileByID", file);
    }
  },
  async SOCKET_FILE_DELETE({ rootState, dispatch }, data) {
    const currentFolderID = rootState.files.currentFolder.id;

    if (isFileInLocation(currentFolderID, data.folderID)) {
      await dispatch("deleteFile", data.fileID);
    }
  },
  async SOCKET_FILE_UPDATE({ rootState, dispatch }, data) {
    const currentFolderID = rootState.files.currentFolder.id;

    if (isFileInLocation(currentFolderID, data.folderID)) {
      const file = await filesApi.getFileByID(data.fileID);
      await dispatch("updateFileByID", file);
    }
  },
  async SOCKET_PERMISSION_ADD({ rootState, dispatch }, data) {
    if (rootState.files.files.includes(data)) return;

    const file = await filesApi.getFileByID(data.fileID);

    if (router.name === "SharedWithMe" && !file.isExternal) {
      await dispatch("addFileByID", file);
    } else if (router.name === "ExternalTransferd" && file.isExternal) {
      await dispatch("addExternalFileByID", file);
    }
  },
  async SOCKET_PERMISSION_DELETE({ dispatch }, data) {
    const file = await filesApi.getFileByID(data.fileID);

    if (
      (router.name === "SharedWithMe" && !file.isExternal) ||
      (router.name === "ExternalTransferd" && file.isExternal)
    )
      await dispatch("deleteFile", data.fileID);
  },
  async SOCKET_PERMISSION_UPDATE({ dispatch }, data) {
    const file = await filesApi.getFileByID(data.fileID);

    if (router.name === "SharedWithMe" && !file.isExternal) {
      await dispatch("updateFileByID", file);
    } else if (router.name === "ExternalTransferd" && file.isExternal) {
      await dispatch("updateExternalFileByID", file);
    }
  },
};

export default {
  actions,
};
