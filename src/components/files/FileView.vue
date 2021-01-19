<template>
  <div>
    <FilesPreview
      v-if="fileView == 1"
      :files="files"
      @contextmenu="onRightClick"
      @dblclick="onDblClick"
      @ctrlclick="onCtrlCLick"
      @fileclick="onFileClick"
    />
    <FileTable
      v-else
      :files="files"
      :serverFilesLength="serverFilesLength"
      :sortable="sortable"
      @page="$emit('page', $event)"
      @contextmenu="onRightClick"
      @dblclick="onDblClick"
      @ctrlclick="onCtrlCLick"
      @fileclick="onFileClick"
    />
    <FileContextMenu ref="contextmenu" :files="chosenFiles" />
    <BottomMenu :chosenFiles="chosenFiles" />
    <Preview ref="preview" />
    <AlertPopup
      ref="convert"
      img="greenConvertFile.svg"
      @confirm="openEditOnline"
      @cancel="openPreview"
      :text="convertMessage(chosenFiles[0])"
      :button="$t('buttons.ConvertNow')"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fileTypes } from "@/config";
import { convertMessageType } from "@/utils/convertMessage";
import { isFolder } from "@/utils/isFolder";
import * as filesApi from "@/api/files";

import FileTable from "@/components/files/list/FileTable";
import AlertPopup from "@/components/popups/BaseAlertPopup";
import BottomMenu from "@/components/popups/menus/BottomMenu";
import FilesPreview from "@/components/files/preview/FilesPreview";
import FileContextMenu from "@/components/popups/menus/FileContextMenu";
import Preview from "@/components/popups/Preview";

export default {
  name: "FileView",
  components: {
    FileTable,
    FilesPreview,
    Preview,
    FileContextMenu,
    BottomMenu,
    AlertPopup,
  },
  props: ["files", "serverFilesLength", "sortable"],
  computed: {
    ...mapGetters(["fileView", "chosenFiles"]),
  },
  created() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "a" && event.ctrlKey) {
        event.preventDefault();
        this.$store.commit("setChosenFiles", this.files);
      }
    });
  },
  methods: {
    canEditOnline(file) {
      return fileTypes.office.includes(file.type);
    },
    isOldOfficeType(file) {
      return fileTypes.oldOffice.includes(file.type);
    },
    convertMessage(file) {
      return file ? this.$t(`file.${convertMessageType(file.type)}`) : "";
    },
    openEditOnline(file) {
      filesApi.editOnline(file.id);
    },
    openPreview(file) {
      this.$refs.preview.open(file);
    },
    onRightClick({ event, file }) {
      event.preventDefault();
      if (!this.chosenFiles.includes(file)) {
        this.$store.commit("setChosenFiles", [file]);
      }
      this.$refs.contextmenu.show(event);
    },
    onDblClick({ event, file }) {
      event.preventDefault();
      if (isFolder(file.type)) {
        this.$router.push({ path: "/folders", query: { id: file.id } });
      } else if (this.canEditOnline(file)) {
        this.openEditOnline(file);
      } else if (this.isOldOfficeType(file)) {
        this.$refs.convert.open(file);
      } else {
        this.openPreview(file);
      }
    },
    onCtrlCLick(file) {
      if (this.chosenFiles.includes(file)) {
        this.$store.commit("removeSelectedFile", file);
      } else {
        this.$store.commit("addSelectedFile", file);
      }
    },
    onFileClick(file) {
      this.$store.commit("setChosenFiles", [file]);
    },
  },
};
</script>

<style scoped>
</style>