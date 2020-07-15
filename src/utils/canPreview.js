import { fileTypes } from "@/config";

export function canPreview(type) {
  return (
    canPreviewPdf(type) ||
    canPreviewMedia(type)
  );
}

export function canPreviewPdf(type) {
  for (let k = 0; k < fileTypes.preview.length; k++) {
    if (type.startsWith(fileTypes.preview[k])) {
      return true;
    }
  }

  return false;
}
export function canPreviewMedia(type) {
  for (let k = 0; k < fileTypes.media.length; k++) {
    if (type.startsWith(fileTypes.media[k])) {
      return true;
    }
  }

  return false;
}
