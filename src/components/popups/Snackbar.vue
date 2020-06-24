<template>
  <v-snackbar v-model="snackbar" top color="white">
    <p id="text">{{ text }}</p>
    <img src="@/assets/icons/success.png" />
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
.v-snack__content {
  justify-content: right !importent;
}
</style>