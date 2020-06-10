<template>
  <input type="file" id="upload-input" @change="uploadInput($event)" multiple />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Upload",
  computed: {
    ...mapGetters(["currentFolder"])
  },
  methods: {
    ...mapActions(["uploadFile"]),
    uploadInput(event) {
      event.currentTarget.files.forEach(file => {
        this.uploadFile(file);
      });
      event.currentTarget.value = ""; // resets file choice
    }
  }
};
</script>

<style>
input {
  display: none;
}
</style>