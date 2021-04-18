<template>
  <div>
    <input v-show="false" type="file" id="upload-input" @change="uploadInput($event)" multiple />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getFilesFromInput } from "./../../utils/drop"; 

export default {
  name: "Upload",
  computed: {
    ...mapGetters(["currentFolder"])
  },
  methods: {
    getFilesFromInput,
    uploadInput(event) {
      this.getFilesFromInput(event.currentTarget.files, this.currentFolder)


      // console.log(event.currentTarget.files)
      // const files = event.currentTarget.files;
      // this.$store.dispatch("uploadFiles", files);
      // event.currentTarget.value = ""; // resets file choice
    },
    open() {
      document.getElementById("upload-input").click();
    }
  },
};
</script>