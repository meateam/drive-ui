<template>
  <v-text-field
    v-model="value"
    :placeholder="placeholder"
    rounded
    dense
    filled
    background-color="white"
    @input="$emit('input', value)"
  ></v-text-field>
</template>

<script>
export default {
  name: "TextField",
  props: ["placeholder", "val"],
  data() {
    return {
      value: null,
    };
  },
  watch: {
    val: function (value) {
      this.value = value;
    },
  },
  mounted() {
    this.value = this.val;
  },
  methods: {
    clear() {
      this.value = "";
    },
  },
};
</script>