<template>
  <div>
    <ListHeader />
    <File v-bind:key="file.id" v-for="file in files" v-bind:file="file" @checked="fileCheck" />
  </div>
</template>

<script>
import File from "./File";
import ListHeader from "./ListHeader";

export default {
  name: "FileList",
  props: ["files"],
  data() {
    return {
      checkedFiles: []
    };
  },
  components: { File, ListHeader },
  methods: {
    fileCheck(isChecked, fileID) {
      if (isChecked) {
        this.checkedFiles[this.checkedFiles.length] = fileID;
      } else {
        this.checkedFiles = this.checkedFiles.filter(file => {
          return file !== fileID;
        });
      }
    }
  }
};
</script>