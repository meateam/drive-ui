export function getFilesFromDroppedItems(dataTransfer, callback) {
    return new Promise((resolve) => {

        let promises = [];

        if (!includesFolder(dataTransfer)) {
            promises.push(new Promise((resolve) => {
                resolve({
                    key: null,
                    files: dataTransfer.files
                })
            }))
            return resolve(promises);
        }

        let files = [];
        const folderReadQueue = [];
        for (let i = 0; i < dataTransfer.items.length; i++) {
            const item = dataTransfer.items[i];
            if (item.kind !== 'file') {
                continue;
            }
            const fileSystemEntries = getEntries(item, callback);
            if (fileSystemEntries) {
                folderReadQueue.push(fileSystemEntries);
            } else {
                const file = item.getAsFile();
                if (file) {
                    files.push(file);
                }
            }
        }

        // Promise.all(folderReadQueue).then(async (filesInFolders) => {
        //     let fileObject = {}

        //     // all files from all folders
        //     files = files.concat(...filesInFolders)

        //     for (const file of files) {

        //         // get teh folder
        //         const path = getPath(file);
        //         if (!fileObject[path]) {
        //             fileObject[path] = []
        //         }
        //         fileObject[path].push(await getFile(file))
        //     }

        //     const keys = Object.keys(fileObject).sort()
        //     for (const key of keys) {
        //         promises.push(new Promise((resolve) => {
        //             resolve({
        //                 key,
        //                 files: fileObject[key]
        //             })
        //         }))
        //     }
        //     resolve(promises)
        // });

    })
}

export async function getEntries(entry, callback) {
    // convert DataTransferItem to FileSystemEntry first if necessary
    if (entry.getAsEntry) {
        return getEntries(entry.getAsEntry(), callback);
    }
    if (entry.webkitGetAsEntry) {
        return getEntries(entry.webkitGetAsEntry(), callback);
    }
    // return if item is from a browser that does not support webkitGetAsEntry
    if (entry.getAsFile) {
        return;
    }

    if (entry.isFile) {
        await callback({
            folder: null,
            file: entry
        })
        return;
    }
    if (entry.isDirectory) {
        console.log("isDirectory", entry)
        //const files = [];
        await callback({
            folder: entry.name,
            file: null
        })
        const entryReader = entry.createReader();
        const readEntries = () => {
            entryReader.readEntries((entries) => {
                const iterateEntry = (i) => {
                    if (!entries[i] && i === 0) {
                        return console.log("empty folder");
                    }
                    if (!entries[i]) {
                        return console.log("finish read all files");
                        //return readEntries();
                    }
                    getEntries(entries[i], callback)
                    iterateEntry(i + 1);

                    // .then((entryFiles) => {
                    //     files.push(...entryFiles);
                    //     iterateEntry(i + 1);
                    // });
                }
                iterateEntry(0);
            });
        }
        readEntries()
    }
}

// export function getEntries(entry, res) {
//     // convert DataTransferItem to FileSystemEntry first if necessary
//     if (entry.getAsEntry) {
//         return getEntries(entry.getAsEntry(), res);
//     }
//     if (entry.webkitGetAsEntry) {
//         return getEntries(entry.webkitGetAsEntry(), res);
//     }
//     // return if item is from a browser that does not support webkitGetAsEntry
//     if (entry.getAsFile) {
//         return;
//     }
//     // Processing directories with more than 100 files:
//     // https://github.com/lian-yue/vue-upload-component/commit/9c9d8aafbcef005a2cc598454383ec65205d61ee
//     return new Promise((resolve) => {
//         if (entry.isFile) {
//             resolve([entry]);
//             return;
//         }
//         if (entry.isDirectory) {
//             const files = [];
//             const entryReader = entry.createReader();
//             const readEntries = () => {
//                 entryReader.readEntries((entries) => {
//                     const iterateEntry = (i) => {
//                         if (!entries[i] && i === 0) {
//                             return resolve(files);
//                         }
//                         if (!entries[i]) {
//                             return readEntries();
//                         }
//                         (getEntries(entries[i], res)).then((entryFiles) => {
//                             files.push(...entryFiles);
//                             iterateEntry(i + 1);
//                         });
//                     };
//                     iterateEntry(0);
//                 });
//             };
//             readEntries();
//         }
//         if (!entry.isFile && !entry.isDirectory) {
//             resolve([]);
//         }
//     });
// }

export function includesFolder(transfer) {
    if (!transfer.files.length) {
        return true; // if dropping only folders, no files will exist
    }

    // Loop through the dropped items and log their data
    for (const item of transfer.items) {
        if (item.webkitGetAsEntry != null) {
            const entry = item.webkitGetAsEntry();

            if (entry && entry.isDirectory) {
                return true;
            }
        }
    }

    const files = transfer.files;

    // tslint:disable-next-line
    for (let i = 0; i < files.length; i++) {
        // A folder has no type and has a size that is a multiple of 4096
        if (!files[i].type && files[i].size % 4096 === 0) {
            return true;
        }
    }
    return false;
}

// function getPath(fileEntry) {
//     const folders = fileEntry.fullPath.split("/");
//     let path = ""
//     for (let i = 1; i < folders.length - 1; i++) {
//         path += "/" + folders[i]
//     }
//     return path;
// }

// async function getFile(fileEntry) {
//     try {
//         return await new Promise((resolve, reject) => fileEntry.file(resolve, reject));
//     } catch (err) {
//         console.log(err);
//     }
// }
