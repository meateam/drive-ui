import { splitFileAndType } from "./getFileType";

/**
 * isFileNameExists checks if there is already file with the same name in the current folder.
 * @param name is the name of the new file
 * @param files is the list of the files
 */
export function isFileNameExists({ name, files, loadingFiles }) {
  if (!name) return true;
  if (files.map((file) => file.name).includes(name)) return true;
  if (loadingFiles.map((file) => file.name).includes(name)) return true;
  return false;
}

/**
 * appendNumberIfFileExists checks if there is already file with the same name in the current folder
 * and if it does, it append a number to the file name.
 * @param name is the name of the new file
 * @param files is the list of the files
 * @param loadingFiles
 * @param isFolder if the file is a folder
 */
export function appendNumberIfFileExists({ name, files, loadingFiles, isFolder = false }) {
  const fileNameInIndex = (filename, index, extension = null) =>
    `${filename}${" (" + index + ")"}${extension ? "." + extension : ""}`;

  if (!name) return [true, null];
  const filesExist = [...files, ...loadingFiles].map((file) => file.name);

  if (filesExist.includes(name)) {
    // If file name exists in the current folder, append a number to the file name
    let fileName, fileType;
    isFolder ? (fileName = name) : ([fileName, fileType] = splitFileAndType(name));

    // Create a new file name with the number appended
    for (let index = 1; index <= filesExist.length; index++) {
      const newFileName = fileNameInIndex(fileName, index, fileType);
      if (!filesExist.includes(newFileName)) return [true, newFileName];
    }

    // If the new file name is still in the list of files, return false 
    // (not supposed to happen, just in case of an error)
    return [true, null];
  }

  // The file name does not exist in the current folder
  return [false, null];
}
