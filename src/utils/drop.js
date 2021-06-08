import store from '@/store'
import i18n from "@/i18n"
import { UploadSet, UploadGet, UploadAction } from "@/store/modules/upload"
import { Promise } from 'bluebird'

export async function getFilesFromDroppedItems(dataTransfer, parent) {
    if (store.getters[UploadGet.isUpload]) {
        return store.dispatch("onError", new Error(i18n.t("errors.waitForUpload")))
    }
    const files = [...dataTransfer.items]
    store.commit(UploadSet.isUpload, true)
    await Promise.all(files.filter((file) => file.kind === 'file').map((file) => getEntries(file, parent, true).catch((err) => store.dispatch("onError", err))));
    store.commit("removeLoadingFiles");
    store.dispatch("fetchFiles");
    store.commit(UploadSet.isUpload, false);
}

export async function getFilesFromInput(files, parent) {
    if (store.getters[UploadGet.isUpload]) {
        return store.dispatch("onError", new Error(i18n.t("errors.waitForUpload")))
    }
    const items = [...files];
    store.commit(UploadSet.isUpload, true)
    await Promise.all(items.map((file) => getEntries(file, parent, true).catch((err) => store.dispatch("onError", err))));
    store.commit("removeLoadingFiles");
    store.dispatch("fetchFiles");
    store.commit(UploadSet.isUpload, false)
}

async function getEntries(entry, parent, isFirstFolder) {

    if (entry instanceof File) {
        return await store.dispatch(UploadAction.uploadFileToFolder, {
            folder: parent,
            file: entry,
        });
    }

    // convert DataTransferItem to FileSystemEntry first if necessary
    if (entry.getAsEntry) {
        return await getEntries(entry.getAsEntry(), parent, isFirstFolder);
    }
    if (entry.webkitGetAsEntry) {
        return await getEntries(entry.webkitGetAsEntry(), parent, isFirstFolder);

    }
    // return if item is from a browser that does not support webkitGetAsEntry
    if (entry.getAsFile) {
        return new Promise((resolve) => resolve());
    }

    if (entry.isFile) {
        return await store.dispatch(UploadAction.uploadFileToFolder, {
            folder: parent,
            file: await getFile(entry),
        });
    }

    if (entry.isDirectory) {
        const res = await store.dispatch(
            isFirstFolder ? UploadAction.createFolder : UploadAction.createFolderInFolder,
            isFirstFolder ? entry.name : { parent: parent, name: entry.name }
        )
        if (isFirstFolder) {
            isFirstFolder = false;
        }
        const entryReader = entry.createReader();
        let entries = await new Promise((resolve) => { entryReader.readEntries((entries) => { resolve(entries) }) });

        let first = true;
        const NUM_OF_MAX_PROMISES = 3;

            await Promise.map(
                entries,
                (entry) => {
                    if (!entry && first) {
                        return new Promise((resolve) => resolve());
                    }
                    first = false;
                    if (!entry) {
                        return new Promise((resolve) => resolve());
                    }
                    return getEntries(entry, res, isFirstFolder);
                },
                { concurrency: NUM_OF_MAX_PROMISES }
            );
    }
}

function getFile(fileEntry) {
    return new Promise((resolve, reject) => fileEntry.file(resolve, reject));
}
