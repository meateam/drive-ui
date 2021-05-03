<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <img
          class="popup-icon auto-margin"
          :src="
            require(`@/assets/icons/${
              externalNetworkDest ? (isColorChange ? 'green' : 'purple') : 'blue'
            }-transfer.svg`)
          "
        />
        <p class="d-title">
          {{
            $t("externalTransfer.Header", {
              dest: destHeader.startsWith("ה") ? destHeader.substring(1) : destHeader,
            })
          }}
        </p>
        <p class="align-center">{{ file.name }}</p>
      </div>

      <div :class="externalNetworkDest ? (isColorChange ? 'popup-body-color' : 'popup-body-purple') : 'popup-body'">
        <div class="align-center" v-if="!isFileAllowed()">
          <p class="popup-text">{{ $t("externalTransfer.errors.FileType") }}</p>
          <p>{{ getAllowedTypes() }}</p>
        </div>

        <div v-else-if="!enableExternalShare" class="align-center">
          {{ $t("externalTransfer.errors.Enabled") }}
        </div>

        <div id="stepper" v-else>
          <v-stepper v-model="currentStep" alt-labels>
            <v-stepper-header>
              <v-stepper-step :complete="currentStep > 1" step="1" :color="colorStepper">{{
                $t("externalTransfer.NetworkDest")
              }}</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="currentStep > 2" step="2" :color="colorStepper">{{
                $t("externalTransfer.Destination")
              }}</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="currentStep > 3" step="3" :color="colorStepper">{{
                $t("externalTransfer.Approval")
              }}</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="4" :color="colorStepper">{{ $t("externalTransfer.AddInfo") }}</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <ExternalNetwork
                  @continue="onExternalNetworkComplete"
                  @change="onExternalNetworkChange"
                  :reset="resetPopup"
                />
              </v-stepper-content>

              <v-stepper-content step="2">
                <Destination
                  @continue="onDestinationComplete"
                  @back="goBack"
                  :networkDest="externalNetworkDest"
                  :reset="resetPopup"
                />
              </v-stepper-content>

              <v-stepper-content step="3">
                <Approval
                  @continue="onApprovalComplete"
                  @back="goBack"
                  :networkDest="externalNetworkDest"
                  :reset="resetPopup"
                />
              </v-stepper-content>

              <v-stepper-content step="4">
                <AddInfo
                  @continue="onInfoComplete"
                  @back="goBack"
                  :reset="resetPopup"
                  :networkDest="externalNetworkDest"
                />
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
          <NotePopup @complete="onComplete" :networkDest="externalNetworkDest" ref="note" />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { fileTypes } from "@/config";
import { getNetworkItemByDest } from "@/utils/networkDest";

import AddInfo from "./steps/AddInfo";
import Destination from "./steps/Destination";
import Approval from "./steps/Approval";
import ExternalNetwork from "./steps/ExternalNetwork";
import NotePopup from "./NotePopup";

export default {
  name: "ExternalTransferPopup",
  computed: {
    ...mapGetters(["enableExternalShare", "externalNetworkDests"]),
    colorStepper: function() {
      return "#035c64";
    },
  },
  components: { AddInfo, Destination, Approval, ExternalNetwork, NotePopup },
  data() {
    return {
      dialog: false,
      currentStep: 1,
      destination: [],
      approvers: [],
      classification: undefined,
      info: undefined,
      externalNetworkDest: undefined,
      destHeader: this.$t("externalTransfer.HeaderDestDefault"),
      isColorChange: false,
      resetPopup: false,
    };
  },
  props: ["file"],
  watch: {
    dialog() {
      this.resetPopup = !this.resetPopup;
      this.externalNetworkDest = undefined;
      this.destHeader = this.$t("externalTransfer.HeaderDestDefault");
      this.isColorChange = false;
      this.currentStep = 1;
    },
  },
  methods: {
    open() {
      this.dialog = true;
      this.currentStep = 1;
    },
    isFileAllowed() {
      const nameArray = this.file.name.split(".");
      const fileType = nameArray[nameArray.length - 1];
      return fileTypes.externalShare.includes(fileType.toLowerCase());
    },
    getAllowedTypes() {
      return fileTypes.externalShare
        .toString()
        .split(",")
        .join(", ");
    },
    onExternalNetworkComplete(externalNetworkDest) {
      this.externalNetworkDest = externalNetworkDest;
      this.currentStep++;
    },
    onExternalNetworkChange(externalNetworkDest) {
      var selectedNetwork = getNetworkItemByDest(externalNetworkDest);
      this.externalNetworkDest = externalNetworkDest;
      this.isColorChange = selectedNetwork ? selectedNetwork.isDefault : false;
      this.destHeader = selectedNetwork ? selectedNetwork.label : this.$t("externalTransfer.HeaderDestDefault");
    },
    onDestinationComplete(users) {
      this.destination = users;
      this.currentStep++;
    },
    onApprovalComplete(users) {
      this.approvers = users;
      this.currentStep++;
    },
    onInfoComplete(info, classification) {
      this.info = info;
      this.classification = classification;
      this.$refs.note.open();
    },
    goBack() {
      this.currentStep--;
    },
    async onComplete() {
      this.currentStep = 1;
      await this.$emit("onShare", {
        users: this.destination,
        fileID: this.file.id,
        fileName: this.file.name,
        info: this.info,
        classification: this.classification,
        approvers: this.approvers,
        destination: this.externalNetworkDest,
        ownerID: this.file.ownerId,
      });
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.theme--light.v-stepper {
  background: transparent;
}
.v-stepper {
  box-shadow: none;
}
.v-stepper__header {
  box-shadow: none;
}

.popup-body-color {
  background-color: #f9fcfa;
  width: 100%;
  padding: 30px 60px;
}

.popup-body-purple {
  background-color: #f4f1f8;
  width: 100%;
  padding: 30px 60px;
}
</style>
