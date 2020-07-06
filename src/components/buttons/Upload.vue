<template>
  <div>
    <input v-show="false" type="file" id="upload-input" @change="uploadInput($event)" multiple />
    <Snackbar ref="snackbar" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Snackbar from "../popups/BaseSnackbar";

export default {
  name: "Upload",
  computed: {
    ...mapGetters(["currentFolder"])
  },
  components: { Snackbar },
  methods: {
    uploadInput(event) {
      const files = event.currentTarget.files;
      const success =
        files.length === 1
          ? this.$t("snackbar.File")
          : this.$t("snackbar.Files");
      this.$store.dispatch("uploadFiles", files).then(() => {
        this.$refs.snackbar.open(success);
      });
      event.currentTarget.value = ""; // resets file choice
      if (this.$tours["tour"].currentStep === 4) {
        this.$tours["tour"].nextStep();
      }
    },
    open() {
      document.getElementById("upload-input").click();
    }
  }
};
</script>