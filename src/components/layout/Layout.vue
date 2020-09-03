<template>
  <div>
    <v-app
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
        <v-progress-circular
          id="loading"
          :size="200"
          :width="7"
          v-if="isLoading"
          color="#035c64"
          indeterminate
        ></v-progress-circular>

        <slot />
      </v-content>

      <NewFeaturesPopup ref="newFeaturesPopup" />
      <ErrorSnackbar />
      <SuccessSnackbar />
    </v-app>
    <div v-else>
      <img id="yesodot" src="@/assets/images/yesodot.svg" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppBar from "@/components/layout/toolbar/AppBar";
import Sidenav from "@/components/layout/sidenav/Sidenav";
import NewFeaturesPopup from "@/components/popups/NewFeaturesPopup";
import SuccessSnackbar from "@/components/popups/snackbars/SuccessSnackbar";
import ErrorSnackbar from "@/components/popups/snackbars/ErrorSnackbar";

export default {
  name: "App",
  computed: {
    ...mapGetters(["isLoading", "user"]),
  },
  components: {
    AppBar,
    Sidenav,
    NewFeaturesPopup,
    SuccessSnackbar,
    ErrorSnackbar,
  },
  mounted() {
    if (this.$route.path === "/my-drive") this.$refs.newFeaturesPopup.open();
  },
  data() {
    return {
      drag: false,
    };
  },
  methods: {
    onDrop(event) {
      event.preventDefault();
      this.drag = false;
      const files = event.dataTransfer.files;
      if (!files) return;
      this.$store.dispatch("uploadFiles", files);
    },
  },
};
</script>

<style scoped>
#loading {
  z-index: 5;
  position: absolute;
  top: calc(50vh - 250px);
  right: calc(50% - 100px);
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
</style>