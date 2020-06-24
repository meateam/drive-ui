<template>
  <div>
    <ListHeader @check="toggleFilesCheck" ref="header" @ />
    <draggable v-model="fileList" @change="onDrop">
      <File
        :key="file.id"
        v-for="file in fileList"
        :file="file"
        ref="files"
        @rightclick="onRightClick"
      />
    </draggable>

    <FilesMenu :chosenFiles="chosenFiles" ref="file" />
    <FileMenu ref="menu" :files="chosenFiles" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
import File from "./File";
import ListHeader from "./ListHeader";
import FilesMenu from "@/components/popups/FilesMenu";
import FileMenu from "@/components/popups/FileMenu";

export default {
  name: "FileList",
  props: ["files"],
  components: { File, ListHeader, FilesMenu, FileMenu, draggable },
  computed: {
    ...mapGetters(["chosenFiles", "folderContentType"])
  },
  data() {
    return {
      isChecked: false,
      fileList: this.files
    };
  },
  watch: {
    chosenFiles: function(val) {
      this.$refs.header.check(
        val.length === this.files.length && val.length !== 0
      );
    },
    files: function(val) {
      this.fileList = val;
    }
  },
  methods: {
    toggleFilesCheck(event) {
      this.$refs.files.forEach(file => {
        file.checkFile(event);
      });
    },
    onRightClick(event, file) {
      if (!this.chosenFiles.includes(file)) {
        this.toggleFilesCheck(false);
      }
      this.$refs.menu.show(event);
    },
    onDrop(event) {
      if (this.files[event.moved.newIndex].type === this.folderContentType)
        this.$store.dispatch("moveFile", {
          folderID: this.files[event.moved.newIndex].id,
          fileIDs: [event.moved.element.id]
        });
    }
  },
  created() {
    window.addEventListener("keydown", event => {
      if (event.key === "a" && event.ctrlKey) {
        event.preventDefault();
        this.toggleFilesCheck(true);
      }
    });
  }
};
</script>