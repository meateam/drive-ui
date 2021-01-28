export async function getFilesFromDroppedItems(dataTransfer, callback) {
    console.log(dataTransfer.items)

    // const readItems = () => {
    //     const entries = dataTransfer.items;
    //     const iterateEntry = async (i) => {
    //         if (!entries[i] && i === 0) {
    //             return console.log("empty drop");
    //         }
    //         if (!entries[i]) {
    //             return console.log("finish read all dropt files");

    //         }
    //         if (entries[i].kind !== 'file') {
    //             iterateEntry(i + 1);
    //             return
    //         }
    //         getEntries(entries[i], undefined, callback);
    //         iterateEntry(i + 1);
    //     }
    //     iterateEntry(0);
    // }
    // readItems()

    for (let i = 0; i < dataTransfer.items.length; i++) {
        const item = dataTransfer.items[i];
        if (item.kind !== 'file') {
            continue;
        }
        getEntries(item, undefined, callback);
    }

}

export async function getEntries(entry, parent, callback) {
    // convert DataTransferItem to FileSystemEntry first if necessary
    if (entry.getAsEntry) {
        return getEntries(entry.getAsEntry(), parent, callback);
    }
    if (entry.webkitGetAsEntry) {
        return getEntries(entry.webkitGetAsEntry(), parent, callback);
    }
    // return if item is from a browser that does not support webkitGetAsEntry
    if (entry.getAsFile) {
        return;
    }

    if (entry.isFile) {
        await callback({
            parent: parent,
            folder: undefined,
            file: await getFile(entry)
        })
        return;
    }

    if (entry.isDirectory) {
        const res = await callback({
            parent: parent,
            folder: entry,
            file: null
        })

        const entryReader = entry.createReader();
        const readEntries = () => {
            entryReader.readEntries((entries) => {
                const iterateEntry = async (i) => {
                    if (!entries[i] && i === 0) {
                        return console.log("empty folder");
                    }
                    if (!entries[i]) {
                        return console.log("finish read all files");
                    }
                    await getEntries(entries[i], res, callback)
                    iterateEntry(i + 1);
                }
                iterateEntry(0);
            });
        }
        readEntries()
    }
}

async function getFile(fileEntry) {
    try {
        return await new Promise((resolve, reject) => fileEntry.file(resolve, reject));
    } catch (err) {
        console.log(err);
    }
}
