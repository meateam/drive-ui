<template>
  <v-text-field
    v-model="value"
    :placeholder="placeholder"
    rounded
    dense
    filled
    background-color="white"
    @change="$emit('input', value)"
  ></v-text-field>
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