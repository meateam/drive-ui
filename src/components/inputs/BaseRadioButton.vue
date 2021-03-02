<template>
  <v-radio-group row :background-color="background" v-model="selected">
    <v-radio
      v-for="(item, index) in items"
      :key="index"
      :label="item.label"
      :value="item.value"
      :color="item.color"
      @click="$emit('change', selected)"
    ></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    items: {
      type: Array,
    },
    background: {
      type: String,
    },
  },
  data() {
    return {
      selected: null,
    };
  },
};
</script>

<style scoped>
/* #radioGroup {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap !important;
} */
</style>
