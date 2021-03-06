<template>
  <div v-if="!isShared">
    <p class="d-subtitle folders-header ">{{ $t("file.Folders") }}</p>
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
    <div v-if="serverFilesLength" id="files-items-pagination" class="files-items flex" ref="filesPagination">
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
    <div v-else class="files-items d-flex justify-center">
      <FilesEmpty />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isFolder } from "@/utils/isFolder";
import Folder from "./items/Folder";
import File from "./items/File";
import FilesEmpty from "@/components/files/FilesEmpty";

export default {
  name: "FilesPreview",
  props: ["files"],
  components: { File, Folder, FilesEmpty },
  computed: {
    ...mapGetters(["chosenFiles", "isShared", "serverFilesLength"]),
  },
  data() {
    return {
      isListenerAttached: false,
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
  updated() {
    if (!this.isListenerAttached) {
      const filesElm = this.$refs.filesPagination;

      if (filesElm) {
        filesElm.addEventListener("scroll", () => {
          if (filesElm.scrollTop + filesElm.clientHeight >= filesElm.scrollHeight) {
            this.page += 1;
            this.$emit("page", this.page);
          }
        });

        this.isListenerAttached = true;
      }
    }
  },
};
</script>

<style scoped>
.folders-header {
  margin-top: 15px;
}
.files-items {
  overflow: auto;
}
#files-items {
  height: 40vh;
}
#files-items-pagination {
  margin-top: 30px;
  height: 70vh;
}
</style>
