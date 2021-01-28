<template>
  <v-container fluid>
    <v-radio-group
      v-model="radioGroupSelection"
      @change="$emit('change', radioGroupSelection)"
      column
      class="d-flex flex-wrap"
    >
      <v-radio
        v-for="radioItem in radioGroup"
        :key="radioItem"
        :label="$t(`share.AdvancedSearchChoices.${radioItem}`)"
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