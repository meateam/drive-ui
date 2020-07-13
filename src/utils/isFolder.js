import { fileTypes } from "@/utils/config";

export function isFolder(type) {
    return type === fileTypes.folder;
}