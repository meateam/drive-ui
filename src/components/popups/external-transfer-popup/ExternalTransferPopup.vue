<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <img
          class="popup-icon auto-margin"
          :src="
            require(`@/assets/icons/${
              isColorChange ? 'purple' : 'green'
            }-transfer.svg`)
          "
        />
        <p class="d-title">
          {{
            $t("externalTransfer.Header", {
              dest: destHeader,
            })
          }}
        </p>
        <p class="align-center">{{ file.name }}</p>
      </div>

      <div :class="isColorChange ? 'popup-body-color' : 'popup-body'">
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
              <v-stepper-step
                :complete="currentStep > 1"
                step="1"
                :color="isColorChange ? '#581845' : '#035c64'"
                >{{ $t("externalTransfer.NetworkDest") }}</v-stepper-step
              >

              <v-divider></v-divider>

              <v-stepper-step
                :complete="currentStep > 2"
                step="2"
                :color="isColorChange ? '#581845' : '#035c64'"
                >{{ $t("externalTransfer.Destination") }}</v-stepper-step
              >

              <v-divider></v-divider>

              <v-stepper-step
                :complete="currentStep > 3"
                step="3"
                :color="isColorChange ? '#581845' : '#035c64'"
                >{{ $t("externalTransfer.Approval") }}</v-stepper-step
              >

              <v-divider></v-divider>

              <v-stepper-step
                step="4"
                :color="isColorChange ? '#581845' : '#035c64'"
                >{{ $t("externalTransfer.AddInfo") }}</v-stepper-step
              >
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <ExternalNetwork @continue="onExternalNetworkComplete" />
              </v-stepper-content>

              <v-stepper-content step="2">
                <Destination
                  @continue="onDestinationComplete"
                  @back="goBack"
                  :networkDest="externalNetworkDest"
                />
              </v-stepper-content>

              <v-stepper-content step="3">
                <Approval @continue="onApprovalComplete" @back="goBack" />
              </v-stepper-content>

              <v-stepper-content step="4">
                <AddInfo @continue="onInfoComplete" @back="goBack" />
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
          <NotePopup @complete="onComplete" ref="note" />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { fileTypes } from "@/config";

import AddInfo from "./steps/AddInfo";
import Destination from "./steps/Destination";
import Approval from "./steps/Approval";
import ExternalNetwork from "./steps/ExternalNetwork";
import NotePopup from "./NotePopup";

export default {
  name: "ExternalTransferPopup",
  computed: {
    ...mapGetters(["enableExternalShare"]),
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
    };
  },
  props: ["file"],
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
      var selectedNetwork = this.$t(
        "externalTransfer.ExternalNetworkDests"
      ).filter((networkDest) => networkDest.value == externalNetworkDest)[0];

      this.isColorChange = selectedNetwork.isColor;
      this.destHeader = selectedNetwork.label;
      this.externalNetworkDest = externalNetworkDest;
      this.currentStep++;
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

      if (this.currentStep == 1) {
        this.destHeader = this.$t("externalTransfer.HeaderDestDefault");
        this.isColorChange = false;
      }
    },
    onComplete() {
      this.currentStep = 1;
      this.dialog = false;
      this.$emit("onShare", {
        users: this.destination,
        fileID: this.file.id,
        fileName: this.file.name,
        info: this.info,
        classification: this.classification,
        approvers: this.approvers,
        destination: this.externalNetworkDest, // TODO: CHANGE TO APP ID
      });
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
  background-color: #f4f0f7;
  width: 100%;
  padding: 30px 60px;
}
</style>
