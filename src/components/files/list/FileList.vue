<template>
  <div>
    <ListHeader />
    <File v-bind:key="file.id" v-for="file in files" v-bind:file="file" @checked="fileCheck" />
    <ActionBar v-bind:checkedFiles="checkedFiles" />
  </div>
</template>

<script>
import File from "./File";
import ListHeader from "./ListHeader";
import ActionBar from "./ActionBar";

export default {
  name: "FileList",
  props: ["files"],
  data() {
    return {
      checkedFiles: []
    };
  },
  watch: {},
  components: { File, ListHeader, ActionBar },
  methods: {
    fileCheck(isChecked, fileID) {
      if (isChecked && !this.checkedFiles.includes(fileID)) {
        this.checkedFiles.push(fileID);
      } else {
        this.checkedFiles = this.checkedFiles.filter(file => {
          return file !== fileID;
        });
      }
    }
  }
};
</script>