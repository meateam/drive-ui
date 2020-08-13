<template>
  <div>
    <input v-show="false" type="file" id="upload-input" @change="uploadInput($event)" multiple />
  </div>
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
      const files = event.currentTarget.files;
      this.$store.dispatch("uploadFiles", files);
      event.currentTarget.value = ""; // resets file choice
    },
    open() {
      document.getElementById("upload-input").click();
    }
  },
};
</script>