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
