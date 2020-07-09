<template>
  <v-snackbar v-model="snackbar" top color="white" @click.stop>
    <img class="space-left fab-icon" src="@/assets/icons/success.svg" />
    <p id="text">{{ text }}</p>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  data() {
    return {
      snackbar: false,
      text: ""
    };
  },
  methods: {
    open(text) {
      this.text = text;
      this.snackbar = true;
    }
  }
};
</script>

<style scoped>
#text {
  direction: rtl;
  color: black;
}
</style>