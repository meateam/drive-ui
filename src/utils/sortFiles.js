export function sortFiles(files) {
    const sortedFiles = files.sort((a, b) => {
        return a.size - b.size;
    });
    return sortedFiles;
}