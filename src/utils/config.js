const baseURL = "http://localhost:8080";
const previewTypes = [
  "application/pdf",
  "text",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/rtf",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.oasis.opendocument.presentation",
];
const mediaTypes = ['image', 'video', 'audio', 'blob'];

export { baseURL, previewTypes, mediaTypes };
