<template>
  <v-speed-dial id="fab" v-model="fab" direction="top" transition="scale-transition">
    <template v-slot:activator>
      <v-btn v-model="fab" fab color="#283145">
        <v-icon color="white" v-if="fab">close</v-icon>
        <v-icon color="white" v-else>add</v-icon>
      </v-btn>
    </template>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" fab big color="#357e6f">
          <img src="@/assets/icons/new.png" />
        </v-btn>
      </template>
      <span>{{ $t("buttons.NewFolder") }}</span>
    </v-tooltip>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" fab color="#357e6f" @click="upload">
          <Upload />
          <img src="@/assets/icons/upload.png" />
        </v-btn>
      </template>
      <span>{{ $t("buttons.UploadFile") }}</span>
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
import Upload from "./Upload";

export default {
  name: "Fab",
  data() {
    return {
      fab: false
    };
  },
  components: { Upload },
  methods: {
    upload() {
      document.getElementById("upload-input").click();
    }
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