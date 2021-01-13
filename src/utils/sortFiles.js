export function sortFiles(files) {
  const sortedFiles = files.concat().sort((a, b) => {
    return a.size - b.size;
  });
  return sortedFiles;
}
