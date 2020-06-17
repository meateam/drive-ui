<template>
  <input type="file" id="upload-input" @change="uploadInput($event)" multiple />
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Upload",
  computed: {
    ...mapGetters(["currentFolder"])
  },
  methods: {
    uploadInput(event) {
      this.$store.dispatch("uploadFiles", event.currentTarget.files);
      event.currentTarget.value = ""; // resets file choice
    },
    open() {
      document.getElementById("upload-input").click();
    }
  }
};
</script>

<style scoped>
input {
  display: none;
}
</style>