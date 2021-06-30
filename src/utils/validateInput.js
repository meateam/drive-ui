const NOT_ALLOWED_CHARS_REGEX = /["|\\/:&%<>^*?$~]+/;
export const isValidString = (str) =>
    str && typeof str === "string" ? !NOT_ALLOWED_CHARS_REGEX.test(str) : false;
