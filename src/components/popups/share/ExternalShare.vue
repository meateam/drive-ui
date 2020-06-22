<template>
  <v-stepper v-model="currentStep" alt-labels>
    <v-stepper-header>
      <v-stepper-step :complete="currentStep > 1" step="1">{{$t('externalShare.Destination')}}</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="currentStep > 2" step="2">{{$t('externalShare.Approval')}}</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">{{$t('externalShare.AddInfo')}}</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <Destination @continue="onDestinationComplete" />
      </v-stepper-content>

      <v-stepper-content step="2">
        <Approval @continue="onApprovalComplete" />
      </v-stepper-content>

      <v-stepper-content step="3">
        <AddInfo @continue="onInfoComplete" />
      </v-stepper-content>

      <v-stepper-content step="4">
        <AddInfo @complete="onComplete" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import AddInfo from "./steps/AddInfo";
import Destination from "./steps/Destination";
import Approval from "./steps/Approval";

export default {
  components: { AddInfo, Destination, Approval },
  props: ["files"],
  data() {
    return {
      currentStep: 1,
      destination: [],
      approvals: [],
      classification: undefined,
      info: undefined
    };
  },
  methods: {
    onDestinationComplete(users) {
      this.destination = users;
      this.currentStep = 2;
    },
    onApprovalComplete(users) {
      this.approvals = users;
      this.currentStep = 3;
    },
    onInfoComplete(info, classification) {
      this.info = info;
      this.classification = classification;
      this.currentStep = 4;
    },
    onComplete() {
      console.log("complete");
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