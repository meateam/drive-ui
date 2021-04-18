<template>
  <div v-if="!isShared">
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

    <div class="files-items flex" id="files-items">
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
  <div v-else>
    <div id="files-items-pagination" class="files-items flex">
      <File
        @dblclick="onDblClick"
        @contextmenu="onRightClick"
        @click="onFileClick"
        @ctrlclick="onCtrlCLick"
        v-for="file in files"
        :isSelected="chosenFiles.includes(file)"
        :key="file.id"
        :file="file"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isFolder } from "@/utils/isFolder";
import Folder from "./items/Folder";
import File from "./items/File";

export default {
  name: "FilesPreview",
  props: ["files"],
  components: { File, Folder },
  computed: {
    ...mapGetters(["chosenFiles", "isShared"]),
  },
  data() {
    return {
      typeFolders: this.files.filter((file) => isFolder(file.type)),
      typeFiles: this.files.filter((file) => !isFolder(file.type)),
      selectedFile: undefined,
      page: 1,
    };
  },
  watch: {
    files: function(val) {
      this.typeFolders = val.filter((file) => isFolder(file.type));
      this.typeFiles = val.filter((file) => !isFolder(file.type));
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
  mounted() {
    const filesElm = document.querySelector("#files-items-pagination");

    filesElm?.addEventListener("scroll", () => {
      if (filesElm.scrollTop + filesElm.clientHeight >= filesElm.scrollHeight) {
        this.page += 1;
        this.$emit("page", this.page);
      }
    });
  },
};
</script>

<style scoped>
.folders-header {
  margin-top: 20px;
}
.files-items {
  overflow: auto;
}
#files-items {
  height: 45vh;
}
#files-items-pagination {
  margin-top: 30px;
  height: 70vh;
}
#noData {
  margin-top: 30px;
  text-align: center;
}
</style>
