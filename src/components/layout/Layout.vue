<template>
  <div>
    <v-app
      :class="{ dragging: drag }"
      v-if="user"
      @dragover.prevent
      @drop.stop.prevent="onDrop"
      @dragenter="drag = true"
      @dragleave="drag = false"
    >
      <AppBar />
      <Sidenav />
      <v-main>
        <slot />
      </v-main>

      <ErrorSnackbar />
      <SuccessSnackbar />
      <WarningSnackbar />
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
import SuccessSnackbar from "@/components/popups/snackbars/SuccessSnackbar";
import WarningSnackbar from "@/components/popups/snackbars/WarningSnackbar";
import ErrorSnackbar from "@/components/popups/snackbars/ErrorSnackbar";

export default {
  name: "App",
  computed: {
    ...mapGetters(["user"]),
  },
  components: {
    AppBar,
    Sidenav,
    SuccessSnackbar,
    ErrorSnackbar,
    WarningSnackbar,
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