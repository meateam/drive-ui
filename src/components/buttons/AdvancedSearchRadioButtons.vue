<template>
  <v-container fluid id="container">
    <v-radio-group
      v-model="advancedSearchSelection"
      @change="$emit('change', advancedSearchSelection)"
      column
      class="d-flex flex-wrap"
    >
      <v-radio
        class="radio"
        v-for="radioItem in radioGroup"
        :key="radioItem"
        :label="$t(`share.AdvancedSearchChoices.${radioItem}`)"
        :value="radioItem"
        color="#007a99"
      ></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script>
export default {
  name: "RadioButtons",
  props: ["radioGroup", "value"],
  data() {
    return {
      advancedSearchSelection: null
    }
  },
  watch: {
    value: function(val) {
      this.advancedSearchSelection = val;
    }
  }
};
</script>

<style>
.v-radio.radio > .v-label {
  font-size: smaller;
}
.radio .v-icon {
  font-size: 22px;
}
</style>>