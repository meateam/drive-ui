<template>
  <v-select
    rounded
    dense
    filled
    background-color="white"
    :items="items"
    v-model="value"
    @change="$emit('change', value)"
  ></v-select>
</template>

<script>
export default {
  name: "Select",
  props: ["items"],
  data() {
    return {
      value: null
    };
  }
};
</script>