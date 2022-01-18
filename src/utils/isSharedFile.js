export function isSharedFile(files, currentFolder) {
    const firstFile = files && files.length > 0 ? files[0] : currentFolder;
    return firstFile && firstFile.shared;
}
