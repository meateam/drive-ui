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
    v-model="selected"
    @change="$emit('change', selected)"
  ></v-select>
</template>

<script>
export default {
  name: "Select",
  props: ["items", "background", "placeholder", "value"],
  data() {
    return {
      selected: null,
    };
  },
  created() {
    this.selected = this.value || null;
  },
};
</script>

<style scoped>
.v-select__slot {
  width: 100px;
}
</style>