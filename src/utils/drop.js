import store from "@/store";
import i18n from "@/i18n";
import {
    UploadSet,
    UploadGet,
    UploadAction,
} from "@/store/modules/uploadFolder";
import { Promise } from "bluebird";
import { getMimeType } from "./fileMimeType";

// this call from the drop event
export async function getFilesFromDroppedItems(dataTransfer, parent) {
    if (store.getters[UploadGet.isUpload]) {
        return store.dispatch(
            "onError",
            new Error(i18n.t("errors.waitForUpload"))
        );
    }
    const files = [...dataTransfer.items];
    store.commit(UploadSet.isUpload, true);
    const uploader = new Upload();
    await Promise.all(
        files
            .filter((file) => file.kind === "file")
            .map((file) => uploader.uploadEntries(file, parent))
    );
    store.commit("removeLoadingFiles");
    store.dispatch("fetchFiles");
    store.commit(UploadSet.isUpload, false);
}

// this call from the plus button
export async function getFilesFromInput(files, parent) {
    if (store.getters[UploadGet.isUpload]) {
        return store.dispatch(
            "onError",
            new Error(i18n.t("errors.waitForUpload"))
        );
    }
    const items = [...files];
    store.commit(UploadSet.isUpload, true);
    const uploader = new Upload();
    await Promise.all(
        items.map((file) => uploader.uploadEntries(file, parent))
    );
    store.commit("removeLoadingFiles");
    store.dispatch("fetchFiles");
    store.commit(UploadSet.isUpload, false);
}

class Upload {
    constructor(maxNumOfFiles = 100, maxNumOfFolders = Infinity) {
        this.filesCounter = 0;
        this.foldersCounter = 0;
        this.maxNumOfFiles = maxNumOfFiles;
        this.maxNumOfFolders = maxNumOfFolders;
    }

    async uploadEntries(file, parent) {
        try {
            return await this.getEntries(file, parent, true);
        } catch (err) {
            store.dispatch("onError", err);
        } finally {
            this.resetCounters();
        }
    }

    resetCounters() {
        this.filesCounter = 0;
        this.foldersCounter = 0;
    }

    countFile() {
        this.filesCounter++;
    }

    removeFile() {
        this.filesCounter--;
    }

    isMaxedFiles() {
        return this.filesCounter >= this.maxNumOfFiles;
    }

    countFolder() {
        this.foldersCounter++;
    }

    removeFolder() {
        this.foldersCounter--;
    }

    isMaxedFolders() {
        return this.foldersCounter >= this.maxNumOfFolders;
    }

    // Receives a file from the array of files received by the user.
    // The action checks if it is a file it uploads it,
    // if it is a folder then it creates a folder in its name and sends it again to the same method and repeats all
    async getEntries(entry, parent, isFirstFolder) {
        if (entry.getAsEntry) {
            // convert DataTransferItem to FileSystemEntry first if necessary
            return await this.getEntries(
                entry.getAsEntry(),
                parent,
                isFirstFolder
            );
        } else if (entry.webkitGetAsEntry) {
            return await this.getEntries(
                entry.webkitGetAsEntry(),
                parent,
                isFirstFolder
            );
        } else if (entry.getAsFile) {
            // return if item is from a browser that does not support webkitGetAsEntry
            return Promise.resolve();
        } else if (entry.isDirectory) {
            if (this.isMaxedFolders()) {
                throw new Error(
                    i18n.t("errors.maxFolders", {
                        maxFolders: this.maxNumOfFolders,
                    })
                );
            }

            try {
                this.countFolder();
                return await this.handleFolderEntry(
                    entry,
                    parent,
                    isFirstFolder
                );
            } catch (err) {
                this.removeFolder();
                throw err;
            }
        } else {
            if (this.isMaxedFiles()) {
                throw new Error(
                    i18n.t("errors.maxFiles", { maxFiles: this.maxNumOfFiles })
                );
            }

            try {
                this.countFile();
                return await this.handleFileEntry(entry, parent);
            } catch (err) {
                this.removeFile();
                throw err;
            }
        }
    }

    async handleFolderEntry(entry, parent, isFirstFolder) {
        const res = await store.dispatch(
            isFirstFolder
                ? UploadAction.createFolder
                : UploadAction.createFolderInFolder,
            isFirstFolder ? entry.name : { parent: parent, name: entry.name }
        );
        isFirstFolder = false;

        const entries = await this.readAllEntries(entry);

        const NUM_OF_MAX_PROMISES = 3;
        return await Promise.map(
            entries,
            (entry) =>
                !entry
                    ? Promise.resolve()
                    : this.getEntries(entry, res, isFirstFolder),
            { concurrency: NUM_OF_MAX_PROMISES }
        );
    }

    async readAllEntries(entry) {
        const entryReader = entry.createReader();
        const entries = [];
        let entriesResult;

        async function promisifiedReadEntries(entryReader) {
            return await new Promise((resolve) =>
                entryReader.readEntries((res) => resolve(res))
            );
        }

        do {
            entriesResult = await promisifiedReadEntries(entryReader);
            entries.push(...Array.prototype.slice.call(entriesResult || [], 0));
        } while (entriesResult.length);

        return entries;
    }

    async handleFileEntry(entry, parent) {
        if (entry instanceof File) {
            return await this.uploadFileToFolder(entry, parent);
        } else if (entry.isFile) {
            return await this.uploadFileToFolder(
                await this.getFile(entry),
                parent
            );
        } else {
            return Promise.reject();
        }
    }

    async uploadFileToFolder(file, folder) {
        return await store.dispatch(UploadAction.uploadFileToFolder, {
            file,
            folder,
        });
    }

    // getFile extracts the file from the fileEntry and returns the new File.
    async getFile(fileEntry) {
        const tempFile = await new Promise((resolve, reject) =>
            fileEntry.file(resolve, reject)
        );
        const file = new File([tempFile], tempFile.name, {
            lastModified: tempFile.lastModified,
            type: !tempFile.type ? getMimeType(tempFile.name) : tempFile.type,
        });
        return file;
    }
}
