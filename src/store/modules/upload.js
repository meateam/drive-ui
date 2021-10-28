import * as filesApi from "@/api/files";
import i18n from "@/i18n";
import * as lastUpdatedFileHandler from "@/utils/lastUpdatedFileHandler";
import { appendNumberIfFileExists } from "@/utils/isFileNameExists";
import { isValidString } from "@/utils/validateInput";
import { generateUId } from "@/utils/uploadUId";

const MB = 1024 * 1024;
const MB5 = MB * 5;

export const UploadSet = {
    isUpload: "SetUploadIsUpload",
};

export const UploadGet = {
    isUpload: "GetUploadIsUpload",
};

export const UploadAction = {
    uploadFileToFolder: "ActionUploadUploadFileToFolder",
    createFolder: "ActionUploadCreateFolder",
    createFolderInFolder: "ActionUploadCreateFolderInFolder",
};

const state = {
    isUpload: false,
};

const getters = {
    [UploadGet.isUpload]: (state) => state.isUpload,
};

const actions = {
    /**
     * uploadFile create multipart or resumable upload by the file size
     * @param file is the file to upload
     */
    async uploadFile({ dispatch, rootState }, file) {
        return await dispatch(UploadAction.uploadFileToFolder, {
            file,
            folder: rootState.files.currentFolder,
        });
    },

    /**
     * uploadFiles uploads all the files async
     * @param files is the files to upload
     */
    async uploadFiles({ dispatch, commit }, files) {
        return Promise.all(
            Object.values(files).map((file) => {
                return dispatch("uploadFile", file);
            })
        )
            .then(() =>
                commit(
                    "onSuccess",
                    files.length === 1 ? "success.File" : "success.Files"
                )
            )
            .catch((err) => {
                dispatch("onError", err);
            });
    },

    async cancelUpload({ commit, dispatch }, file) {
        try {
            await filesApi.cancelUpload(file.source);
            commit("onSuccess", "success.Cancel");
        } catch (err) {
            dispatch("onError", err);
        } finally {
            commit("removeUploadingFile", file.uploadId);
        }
    },

    /**
     * uploadFolder in the current folder
     * @param name is the name of the folder
     */
    async uploadFolder({ commit, dispatch, rootState }, name) {
        try {
            const [isExist, newFileName] = appendNumberIfFileExists({
                name: name,
                files: state.files,
                loadingFiles: rootState.loading.loadingFiles,
                isFolder: true,
            });

            if (isExist) {
                if (newFileName) {
                    name = newFileName;
                } else {
                    throw new Error(i18n.t("errors.folderExistInFolder"));
                }
            }

            await filesApi.uploadFolder({
                name,
                parent: state.currentFolder,
            });

            commit("onSuccess", "success.Folder");
        } catch (err) {
            dispatch("onError", err);
        }
    },
    /**
     * uploadFileToFolder create multipart or resumable upload by the file size
     * @param file is the file to upload
     * @param folder the folder to upload the file to
     */
    async [UploadAction.uploadFileToFolder](
        { commit, rootState },
        { folder, file }
    ) {
        try {
            if (!isValidString(file.name)) {
                commit("onWarning", "warnings.SpecialChars");
                return Promise.resolve();
            }

            if (folder === rootState.files.currentFolder) {
                const [isExist, newFileName] = appendNumberIfFileExists({
                    name: file.name,
                    files: rootState.files.files,
                    loadingFiles: rootState.loading.loadingFiles,
                });

                if (isExist) {
                    if (newFileName) {
                        file = new File([file], newFileName, {
                            type: file.type,
                        });
                    } else {
                        throw new Error(i18n.t("errors.fileExistInFolder"));
                    }
                }
            }

            const uploadId = generateUId();

            const loadingFileCallBack = (file, event, source) => {
                commit("addUploadingFile", {
                    uploadId,
                    name: file.name,
                    progress: Math.round((100 * event.loaded) / event.total),
                    source,
                });
            };

            const fileId = await filesApi[
                file.size <= MB5 ? "multipartUpload" : "resumableUpload"
            ](
                {
                    file,
                    parent: folder,
                },
                loadingFileCallBack
            );
            
            // TODO: fix last updated files
            lastUpdatedFileHandler.pushUpdatedFile(fileId);
            commit("removeUploadingFile", uploadId);
            return fileId;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    /**
     * createFolder in the current folder without notification
     * @param name is the name of the folder
     */
    async [UploadAction.createFolder]({ rootState, commit }, name) {
        if (!isValidString(name)) {
            commit("onWarning", "warnings.SpecialChars");
            return Promise.resolve();
        }

        const fileState = rootState.files;
        const loadingState = rootState.loading;

        const [isExist, newFileName] = appendNumberIfFileExists({
            name: name,
            files: fileState.files,
            loadingFiles: loadingState.loadingFiles,
            isFolder: true,
        });

        if (isExist) {
            if (newFileName) {
                name = newFileName;
            } else {
                throw new Error(i18n.t("errors.folderExistInFolder"));
            }
        }

        const folderId = filesApi.uploadFolder({
            name,
            parent: fileState.currentFolder,
        });
        return folderId;
    },

    /**
     * createFolderInFolder create folder in folder without notification
     * @param parentAndName is contains parent: is the file to create, name: is the name of the folder
     */
    async [UploadAction.createFolderInFolder]({ commit }, { name, parent }) {
        try {
            if (!isValidString(name)) {
                commit("onWarning", "warnings.SpecialChars");
                return Promise.resolve();
            }
            let res = filesApi.uploadFolder({
                name: name,
                parent: parent,
            });
            res.owner = i18n.t("me");
            return res;
        } catch (err) {
            throw new Error(err.message);
        }
    },
};

const mutations = {
    [UploadSet.isUpload]: (state, payload) => {
        state.isUpload = payload;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
