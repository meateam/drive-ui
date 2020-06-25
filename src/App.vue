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
    // document.addEventListener("dragenter", event => {
    //   // on drag enter
    //   event.preventDefault();
    //   this.drag = true;
    // });
    // document.addEventListener("dragleave", event => {
    //   // on drag stop
    //   event.preventDefault();
    //   // this.drag = false;
    // });
    // document.addEventListener("drop", event => {
    //   // on drop
    //   event.preventDefault();
    //   this.onDrop(event);
    // });
  },
  methods: {
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
  filter: blur(5px);
  background-color: violet;
  z-index: 100;
}
</style>