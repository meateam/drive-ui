import store from '@/store'
import i18n from "@/i18n"
import { UploadSet, UploadGet, UploadAction } from "@/store/modules/upload"
import { Promise } from 'bluebird'
import { getMimeType } from './fileMimeType'

// this call from the drop event
export async function getFilesFromDroppedItems(dataTransfer, parent) {
    console.log("getFilesFromDroppedItems: ", parent);
    await canUpload(uploadDroppedCallback.bind(null, dataTransfer, parent));
}

// this call from the plus button
export async function getFilesFromInput(files, parent) {
    await canUpload(uploadInputCallback.bind(null, files, parent));
}

async function uploadDroppedCallback (dataTransferInput, parentInput) {
    console.log("parentInput: ", parentInput);
    const files = [...dataTransferInput.items].filter((file) => file.kind === "file");
    await uploadFiles(files, parentInput);
    store.dispatch("fetchFiles");
}

async function uploadInputCallback(filesInput, parentInput) {
    const files = [...filesInput];
    await uploadFiles(files, parentInput);
    store.dispatch("fetchFiles");
}

async function canUpload(uploadCallback) {
    if (store.getters[UploadGet.isUpload]) {
        return store.dispatch(
            "onError",
            new Error(i18n.t("errors.waitForUpload"))
        );
    }
    return await uploadCallback();
}

async function uploadFiles(files, parent) {
    const uploader = new UploadEntries(
        store.getters.maxUploadedFiles,
        store.getters.maxUploadedFolders
        );
        console.log("files: ", files);
        console.log("parent: ", parent);
    store.commit(UploadSet.isUpload, true);
    await Promise.allSettled(
        files.map((file) => uploader.uploadEntries(file, parent))
    );
    store.commit(UploadSet.isUpload, false);
}

/**
 * A class that handles the upload of entries for both files and folders.
 * The only public method in this class is uploadEntries.
 */
class UploadEntries {
    constructor(maxNumOfFiles = Infinity, maxNumOfFolders = Infinity) {
        this.filesCounter = 0;
        this.foldersCounter = 0;
        this.maxNumOfFiles = maxNumOfFiles;
        this.maxNumOfFolders = maxNumOfFolders;
    }

    /**
     * A function that handles the uploads entries (of file or folder) functionality and handles errors.
     * @param {DataTransferItem} file- the file (or folder) item which will be uploaded.
     * @param {Object} parent- the parent folder that the file will be uploaded to.
     * @returns an array of the uploaded files.
     */
    async uploadEntries(file, parent) {
        try {
            return await this.getEntries(file, parent, true);
        } catch (err) {
            store.dispatch("onError", err);
        } finally {
            this.resetCounters();
        }
    }

    /**
     * Resets the class's counters.
     */
    resetCounters() {
        this.filesCounter = 0;
        this.foldersCounter = 0;
    }

    /**
     * Increment the files counter.
     */
    countFile() {
        this.filesCounter++;
    }

    /**
     * Reduce the files counter.
     */
    removeFile() {
        this.filesCounter--;
    }

    /**
     * Checks if the if the files counter has reached the maximum number of files.
     * @returns true if the files counter has reached the maximum and false otherwise.
     */
    isMaxedFiles() {
        return this.filesCounter >= this.maxNumOfFiles;
    }

    /**
     * Increment the folders counter.
     */
    countFolder() {
        this.foldersCounter++;
    }

    /**
     * Reduce the folder counter.
     */
    removeFolder() {
        this.foldersCounter--;
    }

    /**
     * Checks if the if the folders counter has reached the maximum number of folders.
     * @returns true if the folders counter has reached the maximum and false otherwise.
     */
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
        const [res, entries] = await Promise.all([
            store.dispatch(
                isFirstFolder
                    ? UploadAction.createFolder
                    : UploadAction.createFolderInFolder,
                isFirstFolder
                    ? entry.name
                    : { parent: parent, name: entry.name }
            ),
            this.readAllEntries(entry),
        ]);
        isFirstFolder = false;

        // Handles a folder's content upload asynchronous with 3 promises limitation at once.
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

    /**
     * Read all the files and folders from a given folder entry.
     * @param {DirectoryEntry} entry - a folder that is represented as a folder in the file system.
     * @returns all the entries in the current folder (files and folders).
     */
    async readAllEntries(entry) {
        const entryReader = entry.createReader();
        const entries = [];
        let entriesResult;

        const promisifiedReadEntries = async (entryReader) =>
            await new Promise((resolve) =>
                entryReader.readEntries((res) => resolve(res))
            );

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

    /**
     * Extracts the file from the fileEntry.
     * @param {FileEntry} fileEntry a file that is represented as a file in the file system.
     * @returns a file of type File.
     */
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
