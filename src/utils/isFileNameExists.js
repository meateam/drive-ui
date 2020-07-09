/**
* isFileNameExists checks if there is already file with the same name in the current folder.
* @param name is the name of the new file
* @param files is the list of the files
*/
export function isFileNameExists({ name, files }) {
    if (!name) return true;
    if (files.map(file => file.name).includes(name)) return true;
    return false;
}