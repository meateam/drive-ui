<template>
  <v-dialog v-model="dialog" max-width="450" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-image auto-margin" :src="require(`@/assets/images/status-info.svg`)" />
        <p class="d-title">{{ $t("status.Status") }}</p>
      </div>
      <div class="popup-body">
        <BaseStepper v-if="status && status.length > 0" :items="status" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import BaseStepper from "@/components/status/stepper/BaseStepper";

export default {
  name: "StatusInfoPopup",
  components: { BaseStepper },
  data() {
    return {
      dialog: false,
      status: [],
    };
  },
  methods: {
    open(status) {
      this.status = status;
      this.dialog = true;
    },
    onClose() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
#title {
  font-size: 23px;
  text-align: center;
}
#actions {
  justify-content: center;
  padding: 20px;
}
.popup-image {
  width: 110px;
  padding-top: 30px;
}
</style>
