const baseURL =
  window.location.hostname === "localhost" ? "http://localhost:8080" : "";

const fileTypes = {
  folder: "application/vnd.drive.folder",
  media: ["image", "video", "audio", "blob"],
  preview: [
    "application/pdf",
    "text",
    "application/msword",
    "application/vnd.ms-excel",
    "application/vnd.ms-powerpoint",
    "application/rtf",
    "application/vnd.oasis.opendocument.text",
    "application/vnd.oasis.opendocument.presentation",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  office: [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  oldOffice: [
    "application/msword",
    "application/vnd.ms-excel",
    "application/vnd.ms-powerpoint",
  ],
  officeConvert: {
    "doc": "application/msword",
    "xls": "application/vnd.ms-excel",
    "ppt": "application/vnd.ms-powerpoint",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  docs: ["pptx", "docx", "xlsx", "pdf"],
  externalShare: [
    "png",
    "xlsx",
    "docx",
    "jpg",
    "pptx",
    "txt",
    "jpeg",
    "mp4",
    "mpg",
    "mpeg",
    "bmp",
    "gif",
    "wav",
    "wave",
    "pdf",
  ],
};

const pageSize  = 10;

export { baseURL, fileTypes, pageSize };
