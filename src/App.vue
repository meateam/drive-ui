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
      <div id="page-container">
        <router-view />
      </div>
    </div>
    <div v-else>
      <img id="yesodot" src="@/assets/images/yesodot.svg" />
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import AppBar from "@/components/layout/header/AppBar";
import Sidenav from "@/components/layout/sidenav/Sidenav";

export default {
  name: "App",
  computed: {
    ...mapGetters(["isLoading", "user"])
  },
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
  },
  methods: {
    onDrop(event) {
      event.preventDefault();
      console.log(event);
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
#page-container {
  margin-right: 256px;
}
#yesodot {
  position: fixed;
  width: 500px;
  height: 500px;
  top: calc(50vh - 300px);
  right: calc(50vw - 250px);
}
.dragging {
  filter: blur(3px);
  height: 100vh;
  z-index: 100;
}
.container {
  padding: 0;
}
</style>