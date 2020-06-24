<template>
  <v-snackbar v-model="snackbar" top color="white">
    <img class="space-left" src="@/assets/icons/success.png" />
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
      console.log(this.text);
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