<template>
  <div>
    <v-icon v-if="isFolder(file.type)" :size="size" color="#9caec4">folder</v-icon>

    <v-img v-else-if="fileType==='txt'" src="@/assets/file-types/txt.svg" :width="size" />
    <v-img v-else-if="fileType==='png'" src="@/assets/file-types/png.svg" :width="size" />
    <v-img v-else-if="fileType==='svg'" src="@/assets/file-types/svg.svg" :width="size" />
    <v-img v-else-if="fileType==='pdf'" src="@/assets/file-types/pdf.svg" :width="size" />
    <v-img v-else-if="fileType==='mp3'" src="@/assets/file-types/mp3.svg" :width="size" />
    <v-img v-else-if="fileType==='mp4'" src="@/assets/file-types/mp4.svg" :width="size" />
    <v-img v-else-if="fileType==='jpg'" src="@/assets/file-types/jpg.svg" :width="size" />
    <v-img v-else-if="fileType==='csv'" src="@/assets/file-types/csv.svg" :width="size" />
    <v-img v-else-if="fileType==='css'" src="@/assets/file-types/css.svg" :width="size" />
    <v-img v-else-if="fileType==='html'" src="@/assets/file-types/html.svg" :width="size" />
    <v-img v-else-if="fileType==='xml'" src="@/assets/file-types/xml.svg" :width="size" />
    <v-img v-else-if="fileType==='zip'" src="@/assets/file-types/zip.svg" :width="size" />
    <v-img v-else-if="fileType==='gif'" src="@/assets/file-types/gif.svg" :width="size" />
    <v-img v-else-if="fileType==='avi'" src="@/assets/file-types/avi.svg" :width="size" />
    <v-img v-else-if="fileType==='dwg'" src="@/assets/file-types/dwg.svg" :width="size" />
    <v-img v-else-if="fileType==='ai'" src="@/assets/file-types/ai.svg" :width="size" />
    <v-img v-else-if="fileType==='dbf'" src="@/assets/file-types/dbf.svg" :width="size" />
    <v-img v-else-if="fileType==='ppt'" src="@/assets/file-types/ppt.svg" :width="size" />
    <v-img v-else-if="fileType.startsWith('xls')" src="@/assets/file-types/xls.svg" :width="size" />
    <v-img v-else-if="fileType.startsWith('doc')" src="@/assets/file-types/doc.svg" :width="size" />

    <v-icon v-else-if="file.type.startsWith('audio')" :size="size" color="#9caec4">audiotrack</v-icon>
    <v-icon v-else-if="file.type.startsWith('video')" :size="size" color="#9caec4">movie</v-icon>
    <v-icon v-else color="#9caec4" :size="size">insert_drive_file</v-icon>
  </div>
</template>

<script>
import { fileTypes } from "@/utils/config";
export default {
  name: "FileTypeIcon",
  props: ["file", "size"],
  data() {
    return {
      fileType: this.getFileType(this.file.name)
    };
  },
  methods: {
    getFileType(name) {
      const nameArray = name.split(".");
      const fileType = nameArray[nameArray.length - 1];
      return fileType;
    },
    isFolder(type) {
      return type === fileTypes.folder;
    }
  },
  watch: {
    file: function(val) {
      this.fileType = this.getFileType(val.name);
    }
  }
};
</script>

<style scoped>
</style>