import { fileTypes } from "@/utils/config";

export function canPreview(type) {
  return (
    isIframe(type) ||
    isMedia(type)
  );
}

function isIframe(type) {
  for (let k = 0; k < fileTypes.preview.length; k++) {
    if (type.startsWith(fileTypes.preview[k])) {
      return true;
    }
  }

  return false;
}
function isMedia(type) {
  for (let k = 0; k < fileTypes.media.length; k++) {
    if (type.startsWith(fileTypes.media[k])) {
      return true;
    }
  }

  return false;
}
