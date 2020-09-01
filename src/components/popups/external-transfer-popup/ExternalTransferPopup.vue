<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/green-transfer.svg" />
        <p class="d-title">{{$t('externalTransfer.Header')}}</p>
        <p class="align-center">{{file.name}}</p>
      </div>

      <div class="popup-body">
        <div class="align-center" v-if="!isFileAllowed()">
          <p class="popup-text">{{$t('externalTransfer.errors.FileType')}}</p>
          <p>{{getAllowedTypes()}}</p>
        </div>
        
        <div
          v-else-if="!enableExternalShare"
          class="align-center"
        >{{$t('externalTransfer.errors.Enabled')}}</div>

        <div id="stepper" v-else>
          <v-stepper v-model="currentStep" alt-labels>
            <v-stepper-header>
              <v-stepper-step
                :complete="currentStep > 1"
                step="1"
                color="#035c64"
              >{{$t('externalTransfer.Destination')}}</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step
                :complete="currentStep > 2"
                step="2"
                color="#035c64"
              >{{$t('externalTransfer.Approval')}}</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3" color="#035c64">{{$t('externalTransfer.AddInfo')}}</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <Destination @continue="onDestinationComplete" />
              </v-stepper-content>

              <v-stepper-content step="2">
                <Approval @continue="onApprovalComplete" @back="goBack" />
              </v-stepper-content>

              <v-stepper-content step="3">
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
import * as shareApi from "@/api/share";
import { fileTypes } from "@/config";

import AddInfo from "./steps/AddInfo";
import Destination from "./steps/Destination";
import Approval from "./steps/Approval";
import NotePopup from "./NotePopup";

export default {
  name: "ExternalTransferPopup",
  computed: {
    ...mapGetters(["enableExternalShare"]),
  },
  components: { AddInfo, Destination, Approval, NotePopup },
  data() {
    return {
      dialog: false,
      currentStep: 1,
      destination: [],
      approvers: [],
      classification: undefined,
      info: undefined,
    };
  },
  props: ["file"],
  methods: {
    open() {
      this.dialog = true;
    },
    isFileAllowed() {
      const nameArray = this.file.name.split(".");
      const fileType = nameArray[nameArray.length - 1];
      return fileTypes.externalShare.includes(fileType.toLowerCase());
    },
    getAllowedTypes() {
      return fileTypes.externalShare.toString().split(",").join(", ");
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
    onComplete() {
      shareApi.shareExternalUsers({
        users: this.destination,
        fileID: this.file.id,
        fileName: this.file.name,
        info: this.info,
        classification: this.classification,
        approvers: this.approvers,
      });
      this.currentStep = 1;
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
</style>