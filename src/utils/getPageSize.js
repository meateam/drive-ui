import { pageSize } from '@/config';

export function getPageSize(fileView) {
  return fileView === 0 || fileView === '0' || fileView === 'undefined' || fileView === undefined
    ? pageSize
    : pageSize * 2;
}
