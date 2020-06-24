<template>
  <v-snackbar v-model="snackbar" top color="white">
    <img src="@/assets/icons/success.png" />
    {{ text }}
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  props: ["text"],
  data() {
    return {
      snackbar: false
    };
  },
  methods: {
    open() {
      this.snackbar = true;
    }
  }
};
</script>

<style>
</style>