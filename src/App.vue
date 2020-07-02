<template>
  <v-app>
    <div :class="{active: drag}" v-if="user">
      <AppBar />
      <Sidenav />
      <div id="page-container">
        <router-view />
      </div>
      <v-progress-circular
        v-if="isLoading"
        id="loading"
        :size="100"
        :width="6"
        color="#357e6f"
        indeterminate
      ></v-progress-circular>
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
.active {
  filter: blur(5px);
  background-color: violet;
  z-index: 100;
}
#loading {
  position: absolute;
  top: calc(50vh - 50px);
  left: calc(50vw - 126px);
}
.container {
  padding: 0;
}
</style>