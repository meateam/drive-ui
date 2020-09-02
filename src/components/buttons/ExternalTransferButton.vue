<template>
  <v-tooltip top :disabled="!icon" v-if="canTransfer()">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.transfer.open()"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        id="external-transfer-button"
        text
        :class="{right: !icon}"
      >
        <img class="fab-icon" src="@/assets/icons/transfer.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.ExternalTransfer") }}</p>
      </v-btn>
    </template>
    <span>{{ $t("buttons.ExternalTransfer") }}</span>
    <ExternalTransferPopup ref="transfer" :file="chosenFiles[0]" />
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { writeRole } from "@/utils/roles";
import ExternalTransferPopup from "@/components/popups/external-transfer-popup/ExternalTransferPopup";

export default {
  name: "ExternalTransferButton",
  components: { ExternalTransferPopup },
  computed: {
    ...mapGetters(["currentFolder", "chosenFiles"]),
  },
  props: ["icon"],
  methods: {
    canTransfer() {
      return (
        this.chosenFiles.length === 1 &&
        (!this.currentFolder || writeRole(this.currentFolder.role)) &&
        this.chosenFiles.every(file => writeRole(file.role))
      );
    }
  },
};
</script>