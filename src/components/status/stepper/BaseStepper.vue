<template>
  <v-stepper id="stepper" :vertical="isVertical == undefined || isVertical">
    <v-stepper-header v-if="!(isVertical == undefined || isVertical)">
      <template v-for="(item, indexStep) in items">
        <v-tooltip top :key="indexStep">
          <template v-slot:activator="{ on }">
            <span v-on="on"
              ><v-stepper-step
                :color="colorStep(indexStep)"
                :rules="[() => !(isFailedAtTheEnd(indexStep) && items.length - 1 == indexStep)]"
                :key="'step-' + indexStep"
                :complete="true"
                :step="indexStep + 1"
              />
            </span>
          </template>
          <span>{{ item.displayName }}</span>
        </v-tooltip>

        <v-divider v-if="indexStep != items.length - 1" :key="'divider-' + indexStep"></v-divider>
      </template>
    </v-stepper-header>
    <template v-else v-for="(item, indexStep) in items">
      <v-stepper-step
        :color="colorStep(indexStep)"
        :rules="[() => !(isFailedAtTheEnd(indexStep) && items.length - 1 == indexStep)]"
        :key="'step-' + indexStep"
        :complete="true"
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
    ...mapGetters([
      "statusSuccessType",
      "statusFailedType",
      "statusInProgressType",
      "statusPendingType",
      "statusWaitingForReview",
      "statusSuccessNames",
    ]),
  },
  data: () => ({
    position: 1,
  }),
  props: ["items", "isVertical", "isShowLabels"],
  methods: {
    colorStep: function(indexStep) {
      if (this.isSuccessStep(indexStep)) {
        return "green";
      } else if (this.isWaitingForReviewStep(indexStep)) {
        return "orange";
      } else if (this.isFailedAtTheEnd()) {
        return "red";
      } else {
        return "grey";
      }
    },
    isSuccessStep: function(indexStep) {
      const step = this.$props.items[indexStep];
      return (
        (step.type === this.statusSuccessType ||
          step.type === this.statusInProgressType ||
          step.type === this.statusPendingType) &&
        this.statusSuccessNames.includes(this.$props.items[this.$props.items.length - 1].name)
      );
    },
    isWaitingForReviewStep: function(indexStep) {
      return this.$props.items[indexStep].name === this.statusWaitingForReview && this.$props.items.length == 1;
    },
    isFailedAtTheEnd: function() {
      return this.$props.items[this.$props.items.length - 1].type === this.statusFailedType;
    },
    isFailedStep: function(indexStep) {
      return this.$props.items[indexStep].type === this.statusFailedType;
    },
  },
};
</script>

<style scoped>
#stepper {
  font-size: x-small;
  background: none;
  box-shadow: none;
}
</style>
