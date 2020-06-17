<template>
  <div>
    <ListHeader @check="checkFiles" ref="header" />
    <File v-bind:key="file.id" v-for="file in files" v-bind:file="file" ref="files" />
    <ActionBar :chosenFiles="chosenFiles" ref="file" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import File from "./File";
import ListHeader from "./ListHeader";
import ActionBar from "./ActionBar";

export default {
  name: "FileList",
  props: ["files"],
  components: { File, ListHeader, ActionBar },
  computed: {
    ...mapGetters(["chosenFiles"])
  },
  watch: {
    chosenFiles: val => {
      console.log(val);
      if (val.length === 0) this.$refs.header.check(false);
    }
  },
  methods: {
    checkFiles(event) {
      if (this.$refs.files)
        this.$refs.files.forEach(file => {
          file.checkFile(event);
        });
    },
    init() {
      window.addEventListener("keydown", event => {
        if (event.key === "a" && event.ctrlKey) {
          event.preventDefault();
          this.checkFiles(event);
        }
      });
    }
  },
  created() {
    this.init();
  }
};
</script>