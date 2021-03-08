<template>
  <v-stepper id="stepper">
    <v-stepper-header>
      <template v-for="(item, index) in items">
        <v-stepper-step
          v-if="index == items.length - 1"
          v-bind:key="index"
          :rules="[() => item.type != 'failed']"
          complete
          :step="index + 1"
        >
          <h2>{{ item.displayName }}</h2>
        </v-stepper-step>

        <!-- <v-divider v-if="index != items.length - 1" v-bind:key="index"></v-divider> -->
      </template>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
export default {
  name: "BaseStepper",
  data: () => ({
    position: 1,
  }),
  props: ["items"],
};
</script>

<style scoped>
#stepper {
  font-size: x-small;
  background: none;
  box-shadow: none;
  direction: rtl;
}
</style>
