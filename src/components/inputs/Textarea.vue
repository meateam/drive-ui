<template>
  <v-textarea
    v-model="value"
    :placeholder="placeholder"
    rounded
    height="100"
    dense
    filled
    auto-grow
    background-color="white"
    @input="$emit('input', value)"
  ></v-textarea>
</template>

<script>
export default {
  name: "TextField",
  props: ["placeholder"],
  data() {
    return {
      value: null
    };
  }
};
</script>

<style scoped>
.v-text-field fieldset,
.v-text-field .v-input__control,
.v-text-field .v-input__slot {
  border-radius: 5px !important;
}
.v-text-field--rounded {
  border-radius: 15px;
}
</style>