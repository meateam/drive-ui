<template>
  <v-snackbar v-model="snackbar" top color="red" @click.stop :timeout="7000">
    <p id="text">{{ note }}</p>
  </v-snackbar>
</template>

<script>
export default {
  name: "NoteSnackbar",
  data() {
    return {
      snackbar: false,
      note: "",
    };
  },
  methods: {
    open(note) {
      this.note = note;
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
#text {
  color: white;
}
</style>