<template>
  <v-dialog v-model="dialog" max-width="500" class="popup">
    <v-card>
      <img class="popup-logo" src="@/assets/images/black-logo.svg" />
      <div class="popup-header">
        <img class="auto-margin popup-icon" src="@/assets/icons/drive.svg" />
        <p class="d-title">{{ $t("newFeatures.Title") }}</p>
      </div>
      <div class="popup-body">
        <p class="feature">{{ $t("newFeatures.Subtitle") }}</p>
        <div class="flex feature" v-for="feature in features" :key="feature">
          <img class="fab-icon space-left" src="@/assets/icons/favorites.svg" />
          <p>{{ feature }}</p>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewFeaturesPopup",
  data() {
    return {
      dialog: false,
      features: Object.values(this.$t("newFeatures.Features")),
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.feature {
  padding-bottom: 10px;
}
.popup-icon {
  width: 100px;
}
.popup-logo {
  width: 100px;
  position: absolute;
  left: 10px;
  top: 10px;
}
</style>