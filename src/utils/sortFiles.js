export function sortFiles(files) {
  const sortedFiles = files.concat().sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  return sortedFiles;
}
