export function getFileType(name) {
  const nameArray = name.split(".");
  const fileType = nameArray[nameArray.length - 1];
  return fileType;
}

export function splitFileAndType(name) {
  const nameArray = name.split(".");
  const filename = nameArray.slice(0, nameArray.length - 1).join("");
  const fileType = nameArray[nameArray.length - 1];
  return [filename, fileType];
}
