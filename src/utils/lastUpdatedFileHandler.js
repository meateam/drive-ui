import * as filesApi from "@/api/files";

export async function getUpdatedFiles() {
  const fileIDs =
    JSON.parse(window.localStorage.getItem("lastUpdatedFiles")) || [];

  let files = await Promise.all(
    fileIDs.map(async (fileID) => {
      const file = await filesApi.getFileByID(fileID).catch(() => undefined);
      return file ? file : undefined;
    })
  );

  files = files.filter((file) => !!file);

  window.localStorage.setItem(
    "lastUpdatedFiles",
    JSON.stringify(files.map((file) => file.id))
  );

  return files;
}

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
