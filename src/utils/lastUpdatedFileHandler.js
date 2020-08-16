import * as filesApi from "@/api/files";

export function pushUpdatedFile(fileID) {
  const fileIDs =
    JSON.parse(window.localStorage.getItem("lastUpdatedFiles")) || [];

  if (fileIDs.includes(fileID)) return;

  const lastUpdatedFiles = fileIDs;

  while (lastUpdatedFiles.length === 10) lastUpdatedFiles.shift();

  lastUpdatedFiles.push(fileID);

  window.localStorage.setItem(
    "lastUpdatedFiles",
    JSON.stringify(lastUpdatedFiles)
  );
}

export function removeUpdatedFile(fileID) {
  const fileIDs =
    JSON.parse(window.localStorage.getItem("lastUpdatedFiles")) || [];

  const lastUpdatedFiles = fileIDs.filter((id) => fileID !== id);

  window.localStorage.setItem(
    "lastUpdatedFiles",
    JSON.stringify(lastUpdatedFiles)
  );
}

export async function getUpdatedFilesFromLocalStorage() {
  const fileIDs =
    JSON.parse(window.localStorage.getItem("lastUpdatedFiles")) || [];

  const lastUpdatedFiles = await fileIDs.filter(async (id) => await filesApi.isFileExists(id));

  console.log(lastUpdatedFiles);

  window.localStorage.setItem(
    "lastUpdatedFiles",
    JSON.stringify(lastUpdatedFiles)
  );

  return lastUpdatedFiles;
}
