/**
* isFileNameExists checks if there is already file with the same name in the current folder.
* @param name is the name of the new file
* @param files is the list of the files
*/
export function isFileNameExists({ files, name }) {
    if (!name) return true;
    files.forEach((file) => {
        if (file.name === name) return true;
    });
    return false;
}