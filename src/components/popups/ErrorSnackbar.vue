<template>
  <v-snackbar v-model="open" bottom right color="red" @click.stop v-if="error">
    <div class="flex">
      <v-icon id="block" color="white">block</v-icon>
      <div>
        <p>{{$t('Error')}} {{error.status}}</p>
        <p>{{ error.message }}</p>
      </div>
    </div>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ErrorSnackbar",
  computed: {
    ...mapGetters(["error"])
  },
  data() {
    return {
      open: false
    };
  },
  watch: {
    error: function(val) {
      if (val) this.open = true;
    }
  }
};
</script>

<style scoped>
#block {
  font-size: 40px;
  margin-left: 10px;
}
</style>