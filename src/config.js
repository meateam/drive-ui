const baseURL = "http://localhost:8080";
const fileTypes = {
    folder: "application/vnd.drive.folder",
    media: ["image", "video", "audio", "blob"],
    preview: [
        "application/pdf",
        "text",
        "application/msword",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/rtf",
        "application/vnd.oasis.opendocument.text",
        "application/vnd.oasis.opendocument.presentation",
    ],
    office: ["docx", "pptx", "pdf", "xlsx"],
    externalShare: ["png", "xlsx", "docx", "jpg", "pptx", "txt", "jpeg", "mp4", "mpg", "mpeg", "bmp", "gif", "wav", "wave", "pdf"]
};

export { baseURL, fileTypes };