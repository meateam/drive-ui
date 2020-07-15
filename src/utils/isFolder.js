import { fileTypes } from "@/config";

export function isFolder(type) {
    return type === fileTypes.folder;
}