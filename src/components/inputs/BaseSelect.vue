<template>
  <v-select
    rounded
    dense
    filled
    :background-color="background"
    :items="items"
    :placeholder="placeholder"
    item-text="text"
    item-value="value"
    v-model="value"
    @change="$emit('change', value)"
  ></v-select>
</template>

<script>
export default {
  name: "Select",
  props: ["items", "background", "placeholder"],
  data() {
    return {
      value: null
    };
  }
};
</script>

<style scoped>
.v-select__slot {
  width: 100px;
}
</style>