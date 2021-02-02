import store from '@/store'

export async function getFilesFromDroppedItems(dataTransfer, parent) {
    console.log(dataTransfer.items.length)
    const queue = [];
    for (const item of dataTransfer.items) {
        if (item.kind !== 'file') {
            continue;
        }
        queue.push(getEntries(item, parent, true))
    }
    await Promise.all(queue)
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
        console.log("entry.getAsFile")
        return;
    }

    if (entry.isFile) {
        await store.dispatch("uploadFileToFolder", {
            folder: parent,
            file: await getFile(entry),
        });
        return console.log("finish upload")
    }

    if (entry.isDirectory) {
        let res = null;
        if (isFirstFolder) {
            res = await store.dispatch("createFolder", entry.name)
            isFirstFolder = !isFirstFolder;
        } else {
            res = await store.dispatch("createFolderInFolder", {
                parent: parent,
                name: entry.name,
            })
        }

        const entryReader = entry.createReader();
        const entries = await new Promise((resolve) => { entryReader.readEntries((entries) => { resolve(entries) }) })
        let first = true;
        for (const e of entries) {
            if (!e && first) {
                return console.log("empty folder");
            }
            first = false;
            if (!e) {
                return console.log("finish read all files");
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
