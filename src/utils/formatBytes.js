import fileSize from "filesize";

/**
 * get the the formated size of the file
 * @param bytes is the bytes to format
 */
export function formatBytes(bytes) {
    if (bytes == 0) return "-";
    return fileSize(bytes);
}