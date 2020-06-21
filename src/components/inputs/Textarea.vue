<template>
  <v-textarea
    v-model="value"
    :placeholder="placeholder"
    rounded
    dense
    filled
    auto-grow
    background-color="white"
    @change="$emit('input', value)"
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