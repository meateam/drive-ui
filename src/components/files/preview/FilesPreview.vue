<template>
  <div>
    <p class="d-subtitle folders-header">{{ $t("file.Folders") }}</p>
    <div class="flex">
      <Folder
        @dblclick="onDblClick"
        @contextmenu="onRightClick"
        @click="onFileClick"
        @ctrlclick="onCtrlCLick"
        v-for="folder in typeFolders"
        :isSelected="chosenFiles.includes(folder)"
        :key="folder.id"
        :folder="folder"
      />
    </div>
    <p class="d-subtitle">{{ $t("file.Files") }}</p>
    <div class="flex">
      <File
        @dblclick="onDblClick"
        @contextmenu="onRightClick"
        @click="onFileClick"
        @ctrlclick="onCtrlCLick"
        v-for="file in typeFiles"
        :isSelected="chosenFiles.includes(file)"
        :key="file.id"
        :file="file"
      />
    </div>
    <FileContextMenu ref="contextmenu" :files="chosenFiles" />
    <Preview ref="preview" />
    <AlertPopup
      ref="convertPopup"
      @confirm="onConvert"
      @cancel="openPreview"
      img="convertPopup.svg"
      :text="$t(`file.${convertMessage(selectedFile)}`)"
      :button="$t('buttons.ConvertNow')"
      :data="selectedFile"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fileTypes } from "@/config";
import * as filesApi from "@/api/files";
import Preview from "@/components/popups/Preview";
import AlertPopup from "@/components/popups/BaseAlertPopup";
import FileContextMenu from "@/components/popups/menus/FileContextMenu";
import Folder from "./items/Folder";
import File from "./items/File";

export default {
  name: "FilesPreview",
  props: ["files"],
  components: { File, Folder, FileContextMenu, Preview, AlertPopup },
  computed: {
    ...mapGetters(["chosenFiles"]),
  },
  data() {
    return {
      typeFolders: this.files.filter(
        (file) => file.type === "application/vnd.drive.folder"
      ),
      typeFiles: this.files.filter(
        (file) => file.type !== "application/vnd.drive.folder"
      ),
      selectedFile: undefined
    };
  },
  watch: {
    files: function (val) {
      this.typeFolders = val.filter(
        (file) => file.type === "application/vnd.drive.folder"
      );
      this.typeFiles = val.filter(
        (file) => file.type !== "application/vnd.drive.folder"
      );
    },
  },
  methods: {
    onDblClick(event, file) {
      this.selectedFile = file
      event.preventDefault();
      if (file.type === fileTypes.folder) {
        this.$router.push({ path: "/folders", query: { id: file.id } });
      } else if (this.canEditOnline(file)) {
        filesApi.editOnline(file.id);
      } else if (this.isOldOfficeType(file)) {
        this.$refs.convertPopup.open()
      } else {
        this.openPreview(file);
      }
    },
    onRightClick(event, file) {
      this.selectedFile = file
      event.preventDefault();
      if (!this.chosenFiles.includes(file)) {
        this.$store.commit("onFilesSelect", [file]);
      }
      this.$refs.contextmenu.show(event);
    },
    onCtrlCLick(event, file) {
      let selected = this.chosenFiles;
      if (!this.chosenFiles.includes(file)) {
        selected.push(file);
        this.$store.commit("onFilesSelect", selected);
      } else {
        selected = selected.filter((item) => item !== file);
        this.$store.commit("onFilesSelect", selected);
      }
    },
    onFileClick(event, file) {
      this.$store.commit("onFilesSelect", [file]);
    },
    onConvert(file) {
      filesApi.editOnline(file.id);
    },
    canEditOnline(file) {
      return fileTypes.office.includes(file.type);
    },
    isOldOfficeType(file) {
      return fileTypes.oldOffice.includes(file.type);
    },
    openPreview(file) {
      this.$refs.preview.open(file);
    },
    convertMessage(file) {
      if(file) {
        switch(file.type) {
          case fileTypes.officeConvert["doc"]: {
            return "ConvertDOC";
          }
          case fileTypes.officeConvert["xls"]: {
            return "ConvertXLS";
          }
          case fileTypes.officeConvert["ppt"]: {
            return "ConvertPPT";
          }
        }
      }
    }
  },
};
</script>

<style scoped>
.folders-header {
  margin-top: 20px;
}
</style>