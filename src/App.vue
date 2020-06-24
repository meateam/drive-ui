<template>
  <v-app :class="{active: drag}">
    <AppBar />
    <Sidenav />
    <v-container id="page">
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import AppBar from "@/components/layout/header/AppBar";
import Sidenav from "@/components/layout/sidenav/Sidenav";

export default {
  name: "App",
  components: {
    AppBar,
    Sidenav
  },
  created() {
    window.addEventListener("keydown", event => {
      // ctrl o shortcut to upload file
      if (event.keyCode === 79 && event.ctrlKey) {
        event.preventDefault();
        document.getElementById("upload-input").click();
      }
    });
    window.addEventListener("dragenter", event => {
      // on drag enter
      event.preventDefault();
      this.onDragEnter();
    });
    window.addEventListener("dragleave", event => {
      // on drag stop
      event.preventDefault();
      this.onDragEnd();
    });
    window.addEventListener("drop", event => {
      // on drop
      event.preventDefault();
      this.onDrop(event);
    });
  },
  data() {
    return {
      drag: false
    };
  },
  methods: {
    onDragEnter() {
      this.drag = true;
    },
    onDragEnd() {
      this.drag = false;
    },
    onDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (!files) return;
      this.$store.dispatch("uploadFiles", files);
      this.onDragEnd();
    }
  }
};
</script>

<style scoped>
@import "./styles/global.css";
#page {
  margin-right: 256px;
  width: calc(100vw - 256px);
}
.active {
  backdrop-filter: blur(2px);
  z-index: 10;
}
</style>