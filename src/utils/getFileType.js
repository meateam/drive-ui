export function getFileType(name) {
    const nameArray = name.split(".");
    const fileType = nameArray[nameArray.length - 1];
    return fileType;
}