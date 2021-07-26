import mime from 'mime-types'

const UNRECOGNIZED_FILE_MIME_TYPE = 'application/octet-stream';

export const getMimeType = (filename) => mime.lookup(filename) || UNRECOGNIZED_FILE_MIME_TYPE;
