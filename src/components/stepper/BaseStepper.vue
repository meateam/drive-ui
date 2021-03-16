<template>
  <v-stepper id="stepper" :vertical="isVertical == undefined || isVertical">
    <v-stepper-header v-if="!(isVertical == undefined || isVertical)">
      <template v-for="(item, indexStep) in items">
        <v-stepper-step
          :color="isSuccessStep[indexStep] ? 'green' : 'grey'"
          :rules="[() => item.type != statusFailedType]"
          :key="'step-' + indexStep"
          :complete="isSuccessStep[indexStep]"
          :step="indexStep + 1"
        >
          <h2 v-if="isShowLabels == undefined || isShowLabels">{{ item.displayName }}</h2>
        </v-stepper-step>

        <v-divider v-if="indexStep != items.length - 1" :key="'divider-' + indexStep"></v-divider>
      </template>
    </v-stepper-header>
    <template v-else v-for="(item, indexStep) in items">
      <v-stepper-step
        :color="isSuccessStep[indexStep] ? 'green' : 'grey'"
        :rules="[() => item.type != statusFailedType]"
        :key="'step-' + indexStep"
        :complete="isSuccessStep[indexStep]"
         :step="indexStep + 1"
      >
        <h2 v-if="isShowLabels == undefined || !isShowLabels">{{ item.displayName }}</h2>
      </v-stepper-step>
    </template>
  </v-stepper>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseStepper",
  computed: {
    ...mapGetters(["statusSuccessType", "statusFailedType", "statusInProgressType"]),
     isSuccessStep() {
      return this.items.map(step =>
        step.type == this.statusSuccessType ||
        (step.type == this.statusInProgressType && this.items[this.items.length - 1].type == this.statusSuccessType)
      )
    },
  },
  data: () => ({
    position: 1,
  }),
  props: ["items", "isVertical", "isShowLabels"],
};
</script>

<style scoped>
#stepper {
  font-size: x-small;
  background: none;
  box-shadow: none;
  /* direction: rtl; */
}
</style>
