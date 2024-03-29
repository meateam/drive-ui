<template>
  <div class="display-img">
    <v-icon v-if="isFolder(file.type)" :size="size" color="#4FBEA0">folder</v-icon>
    <v-img v-else-if="isDeleted(file)" src="@/assets/file-types/deleted.svg" :width="size" />
    
    <v-img v-else-if="fileType === 'txt'" src="@/assets/file-types/txt.svg" :width="size" />
    <v-img v-else-if="fileType === 'png'" src="@/assets/file-types/png.svg" :width="size" />
    <v-img v-else-if="fileType === 'svg'" src="@/assets/file-types/svg.svg" :width="size" />
    <v-img v-else-if="fileType === 'pdf'" src="@/assets/file-types/pdf.svg" :width="size" />
    <v-img v-else-if="fileType === 'mp3'" src="@/assets/file-types/mp3.svg" :width="size" />
    <v-img v-else-if="fileType === 'psd'" src="@/assets/file-types/psd.svg" :width="size" />
    <v-img v-else-if="fileType === 'js'" src="@/assets/file-types/js.svg" :width="size" />
    <v-img v-else-if="fileType === 'mp4'" src="@/assets/file-types/mp4.svg" :width="size" />
    <v-img v-else-if="fileType === 'jpg'" src="@/assets/file-types/jpg.svg" :width="size" />
    <v-img v-else-if="fileType === 'csv'" src="@/assets/file-types/csv.svg" :width="size" />
    <v-img v-else-if="fileType === 'css'" src="@/assets/file-types/css.svg" :width="size" />
    <v-img v-else-if="fileType === 'html'" src="@/assets/file-types/html.svg" :width="size" />
    <v-img v-else-if="fileType === 'xml'" src="@/assets/file-types/xml.svg" :width="size" />
    <v-img v-else-if="fileType === 'zip'" src="@/assets/file-types/zip.svg" :width="size" />
    <v-img v-else-if="fileType === 'gif'" src="@/assets/file-types/gif.svg" :width="size" />
    <v-img v-else-if="fileType === 'avi'" src="@/assets/file-types/avi.svg" :width="size" />
    <v-img v-else-if="fileType === 'dwg'" src="@/assets/file-types/dwg.svg" :width="size" />
    <v-img v-else-if="fileType === 'ai'" src="@/assets/file-types/ai.svg" :width="size" />
    <v-img v-else-if="fileType === 'dbf'" src="@/assets/file-types/dbf.svg" :width="size" />
    <v-img v-else-if="fileType.startsWith('ppt')" src="@/assets/file-types/ppt.svg" :width="size" />
    <v-img v-else-if="fileType.startsWith('xls')" src="@/assets/file-types/xls.svg" :width="size" />
    <v-img v-else-if="fileType.startsWith('doc')" src="@/assets/file-types/doc.svg" :width="size" />

    <v-icon v-else-if="file.type.startsWith('audio')" :size="size" color="#9caec4">audiotrack</v-icon>
    <v-icon v-else-if="file.type.startsWith('video')" :size="size" color="#9caec4">movie</v-icon>
    <v-icon v-else color="#1a73e8" :size="size">insert_drive_file</v-icon>
    <v-icon v-if="file.isFavorite && isTypeIcon" class="star-icon" small>star</v-icon>
  </div>
</template>

<script>
import { fileTypes } from "@/config";
import { getFileType } from "@/utils/getFileType";

export default {
  name: "FileTypeIcon",
  props: ["file", "size", "isTypeIcon"],
  data() {
    return {
      fileType: getFileType(this.file.name),
    };
  },
  methods: {
    isFolder(type) {
      return type === fileTypes.folder;
    },
    isDeleted(file) {
      return file?.isDeleted != undefined && file.isDeleted;
    },
  },
  watch: {
    file: function(val) {
      this.fileType = getFileType(val.name);
    },
  },
};
</script>

<style scoped>
.star-icon {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: -5px; 
  left: -2px;
  color: #FFA500;
}

.display-img {
  position: relative;
}
</style>
