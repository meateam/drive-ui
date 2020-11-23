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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Folder from "./items/Folder";
import File from "./items/File";

export default {
  name: "FilesPreview",
  props: ["files"],
  components: { File, Folder },
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
      this.$emit("dblclick", { event, file });
    },
    onRightClick(event, file) {
      this.$emit("contextmenu", { event, file });
    },
    onCtrlCLick(file) {
      this.$emit("ctrlclick", file);
    },
    onFileClick(file) {
      this.$emit("fileclick", file);
    },
  },
};
</script>

<style scoped>
.folders-header {
  margin-top: 20px;
}
</style>