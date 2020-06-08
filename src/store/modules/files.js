const state = {
  allowedTypes: [
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

const getters = {
    allowedFileTypes: state => state.allowedTypes,
};

const actions = {};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
