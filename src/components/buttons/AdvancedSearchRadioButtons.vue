<template>
  <v-container fluid>
    <v-radio-group
      v-model="radioGroupSelection"
      @change="$emit('change', radioGroupSelection)"
      column
    >
      <v-radio
        v-for="radioItem in radioGroup"
        :key="radioItem"
        :label="$t(`share.${radioItem}`)"
        :value="radioItem"
      ></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script>
export default {
  name: "RadioButtons",
  props: ["radioGroup"],
  data() {
    return {
      radioGroupSelection: null,
    };
  },
};
</script>

<style scoped>
</style>