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
        <Approval @continue="currentStep = 3" />
      </v-stepper-content>

      <v-stepper-content step="3">
        <AddInfo @continue="currentStep = currentStep = 1" />
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
      approval: undefined
    };
  },
  methods: {
    onDestinationComplete(users) {
      this.destination = users;
      this.currentStep = 2;
    },
    onApprovalComplete(user) {
      this.approval = user;
      this.currentStep = 3;
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