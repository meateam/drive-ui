<template>
  <div>
    <ListHeader @check="toggleFilesCheck" ref="header" />
    <File
      v-bind:key="file.id"
      v-for="file in files"
      v-bind:file="file"
      ref="files"
      @rightclick="$refs.menu.show($event)"
    />
    <FilesMenu :chosenFiles="chosenFiles" ref="file" />
    <FileMenu ref="menu" :files="chosenFiles" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import File from "./File";
import ListHeader from "./ListHeader";
import FilesMenu from "@/components/popups/FilesMenu";
import FileMenu from "@/components/popups/FileMenu";

export default {
  name: "FileList",
  props: ["files"],
  components: { File, ListHeader, FilesMenu, FileMenu },
  computed: {
    ...mapGetters(["chosenFiles"])
  },
  data() {
    return {
      isChecked: false
    };
  },
  watch: {
    chosenFiles: function(val) {
      this.$refs.header.check(
        val.length === this.files.length && val.length !== 0
      );
    }
  },
  methods: {
    toggleFilesCheck(event) {
      this.$refs.files.forEach(file => {
        file.checkFile(event);
      });
    },
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