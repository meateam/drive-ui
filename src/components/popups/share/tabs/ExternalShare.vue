<template>
  <div>
    <v-stepper v-model="currentStep" alt-labels v-if="!complete">
      <v-stepper-header>
        <v-stepper-step
          :complete="currentStep > 1"
          step="1"
          color="#357e6f"
        >{{$t('externalShare.Destination')}}</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="currentStep > 2"
          step="2"
          color="#357e6f"
        >{{$t('externalShare.Approval')}}</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" color="#357e6f">{{$t('externalShare.AddInfo')}}</v-stepper-step>
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
    <Note @complete="onComplete" v-if="complete" @back="goBack" />
  </div>
</template>

<script>
import * as shareApi from "@/api/share";
import AddInfo from "./steps/AddInfo";
import Destination from "./steps/Destination";
import Approval from "./steps/Approval";
import Note from "./steps/Note";

export default {
  components: { AddInfo, Destination, Approval, Note },
  props: ["file"],
  data() {
    return {
      currentStep: 1,
      destination: [],
      approvers: [],
      classification: undefined,
      info: undefined,
      complete: false
    };
  },
  methods: {
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
      this.currentStep++;
      this.complete = true;
    },
    goBack() {
      this.complete = false;
      this.currentStep--;
    },
    onComplete() {
      shareApi.shareExternalUsers({
        users: this.destination,
        fileID: this.file.id,
        fileName: this.file.name,
        info: this.info,
        classification: this.classification,
        approvers: this.approvers
      });
      this.currentStep = 1;
      this.$emit("close");
    }
  }
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