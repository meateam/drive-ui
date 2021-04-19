import store from '@/store'
import { UploadSet, UploadAction } from "@/store/modules/upload"

export async function getFilesFromDroppedItems(dataTransfer, parent) {
    const items = [...dataTransfer.items]
    console.log(items)
    store.commit(UploadSet.isUpload, true)

    const promises = [];

    for (const file of items) {
        if (file.kind === 'file') {
            promises.push(getEntries(file, parent, true))
        }
    }
    for (const p of promises) {
        try {
            await p
        } catch (err) {
            store.dispatch("onError", err);
        }
    }
    store.commit("removeLoadingFiles");
    store.dispatch("fetchFiles");
    store.commit(UploadSet.isUpload, false);
}

export async function getFilesFromInput(files, parent) {
    const items = [...files];
    console.log(items, parent)
    store.commit(Set.isUpload, true)

    const promises = [];

    for (const file of items) {
        promises.push(getEntries(file, parent, true))
    }
    for (const p of promises) {
        try {
            await p
        } catch (err) {
            store.dispatch("onError", err);
        }
    }
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
        return;
    }

    if (entry.isFile) {
        return await store.dispatch(UploadAction.uploadFileToFolder, {
            folder: parent,
            file: await getFile(entry),
        });
    }

    if (entry.isDirectory) {
        try {
            let res = null;
            if (isFirstFolder) {
                res = await store.dispatch(UploadAction.createFolder, entry.name)
                isFirstFolder = !isFirstFolder;
            } else {
                res = await store.dispatch(UploadAction.createFolderInFolder, {
                    parent: parent,
                    name: entry.name,
                })
            }

            const entryReader = entry.createReader();
            const entries = await new Promise((resolve) => { entryReader.readEntries((entries) => { resolve(entries) }) })
            let first = true;
            for (const e of entries) {
                if (!e && first) {
                    return;
                }
                first = false;
                if (!e) {
                    return;
                }
                await getEntries(e, res, isFirstFolder)
            }
        } catch (err) {
            throw new Error(err.message)
        }
    }
}

async function getFile(fileEntry) {
    return await new Promise((resolve, reject) => fileEntry.file(resolve, reject));
}
