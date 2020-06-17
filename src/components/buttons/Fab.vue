<template>
  <v-speed-dial id="fab" v-model="fab" direction="top" transition="scale-transition">
    <template v-slot:activator>
      <v-btn v-model="fab" fab color="#283145">
        <v-icon color="white" v-if="fab">close</v-icon>
        <v-icon color="white" v-else>add</v-icon>
      </v-btn>
      <Upload ref="upload" />
    </template>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn @click.stop="$refs.folderPopup.open()" v-on="on" fab big color="#357e6f">
          <NewFolder ref="folderPopup" />
          <img src="@/assets/icons/new.png" />
        </v-btn>
      </template>
      <span>{{ $t("buttons.NewFolder") }}</span>
    </v-tooltip>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" fab color="#357e6f" @click="$refs.upload.open()">
          <!-- transparent input for upload files -->
          <img src="@/assets/icons/upload.png" />
        </v-btn>
      </template>
      <span>{{ $t("buttons.UploadFile") }}</span>
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
import Upload from "./Upload";
import NewFolder from "../popups/NewFolder";

export default {
  name: "Fab",
  data() {
    return {
      fab: false
    };
  },
  components: { Upload, NewFolder },
  methods: {
    init() {
      window.addEventListener("keydown", event => {
        if (event.key === "o" && event.ctrlKey) {
          event.preventDefault();
          this.$refs.upload.open();
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
#fab {
  position: fixed;
  direction: ltr;
  bottom: 50px;
  left: 50px;
}
</style>