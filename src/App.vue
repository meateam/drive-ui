<template>
  <v-app>
    <div
      :class="{dragging: drag}"
      v-if="user"
      @dragover.prevent
      @drop.stop.prevent="onDrop"
      @dragenter="drag=true"
      @dragleave="drag=false"
    >
      <AppBar />
      <Sidenav />
      <v-content>
        <div id="loading">
          <v-progress-circular
            :size="200"
            :width="7"
            v-if="isLoading"
            color="#357e6f"
            indeterminate
          ></v-progress-circular>
        </div>
        <router-view />
      </v-content>
    </div>
    <div v-else>
      <img id="yesodot" src="@/assets/images/yesodot.svg" />
    </div>
    <ErrorSnackbar />
    <Snackbar />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import AppBar from "@/components/layout/toolbar/AppBar";
import Sidenav from "@/components/layout/sidenav/Sidenav";
import Snackbar from "@/components/popups/SuccessSnackbar";
import ErrorSnackbar from "@/components/popups/ErrorSnackbar";

export default {
  name: "App",
  computed: {
    ...mapGetters(["isLoading", "user"])
  },
  components: {
    AppBar,
    Snackbar,
    Sidenav,
    ErrorSnackbar
  },
  data() {
    return {
      drag: false
    };
  },
  created() {
    window.addEventListener("keydown", event => {
      // ctrl o shortcut to upload file
      if (event.keyCode === 79 && event.ctrlKey) {
        event.preventDefault();
        document.getElementById("upload-input").click();
      }
    });
  },
  methods: {
    onDrop(event) {
      event.preventDefault();
      this.drag = false;
      const files = event.dataTransfer.files;
      if (!files) return;
      this.$store.dispatch("uploadFiles", files);
    }
  }
};
</script>

<style scoped>
@import "./styles/global.css";
#yesodot {
  position: fixed;
  width: 500px;
  height: 500px;
  top: calc(50vh - 300px);
  right: calc(50vw - 250px);
}
#loading {
  position: absolute;
  top: calc(50vh - 250px);
  right: calc(50% - 100px);
}
.dragging {
  filter: blur(3px);
  height: 100vh;
  z-index: 100;
}
</style>