import store from '@/store'
import { Action } from "@/store/modules/upload"

export async function getFilesFromDroppedItems(dataTransfer, parent) {
    const items = [...dataTransfer.items];
    await Promise.all(items.filter((item) => item.kind === 'file').map((item) => getEntries(item, parent, true)))
    store.commit("removeLoadingFiles");
    store.dispatch("fetchFiles");
}

async function getEntries(entry, parent, isFirstFolder) {
    // convert DataTransferItem to FileSystemEntry first if necessary
    if (entry.getAsEntry) {
        await getEntries(entry.getAsEntry(), parent, isFirstFolder);
        return
    }
    if (entry.webkitGetAsEntry) {
        await getEntries(entry.webkitGetAsEntry(), parent, isFirstFolder);
        return
    }
    // return if item is from a browser that does not support webkitGetAsEntry
    if (entry.getAsFile) {
        return;
    }

    if (entry.isFile) {
        await store.dispatch(Action.uploadFileToFolder, {
            folder: parent,
            file: await getFile(entry),
        });
        return;
    }

    if (entry.isDirectory) {
        let res = null;
        if (isFirstFolder) {
            res = await store.dispatch(Action.createFolder, entry.name)
            isFirstFolder = !isFirstFolder;
        } else {
            res = await store.dispatch(Action.createFolderInFolder, {
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
    }
}

async function getFile(fileEntry) {
    try {
        return await new Promise((resolve, reject) => fileEntry.file(resolve, reject));
    } catch (err) {
        console.log(err);
    }
}
