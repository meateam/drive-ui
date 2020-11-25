<template>
  <v-snackbar v-model="open" top color="white" te @click.stop :timeout="1500">
    <img class="space-left fab-icon" src="@/assets/icons/success.svg" />
    <span id="text">{{ $t(success) }}</span>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Snackbar",
  data() {
    return {
      open: false,
    };
  },
  computed: {
    ...mapGetters(["success"]),
  },
  watch: {
    success: function (val) {
      if (val) this.open = true;
    },
    open: function (val) {
      if (!val) this.$store.commit("onSuccess", undefined);
    },
  },
};
</script>

<style scoped>
#text {
  color: black;
}
</style>