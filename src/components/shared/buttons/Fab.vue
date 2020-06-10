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
      <span>{{ $t("fab.NewFolder") }}</span>
    </v-tooltip>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" fab color="#357e6f">
          <img src="@/assets/icons/upload.png" />
        </v-btn>
      </template>
      <span>{{ $t("fab.UploadFile") }}</span>
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
export default {
  name: "Fab",
  data() {
    return {
      fab: false
    };
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