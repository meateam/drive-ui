import { pageSize } from "@/config";

// Get page size for the current fileview (item or list)
// if fileview is not defiend or list, return amount of pageSize, otherwise (item view) return pageSize*2
export function getPageSize(fileView) {
  return ["0", 0, "undefined", undefined].includes(fileView) ? pageSize : pageSize * 2;
}
