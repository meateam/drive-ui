<template>
  <v-snackbar v-model="open" bottom right color="orange" @click.stop v-if="warning">
    <div class="flex">
      <v-icon id="block" color="white">block</v-icon>
      <div>
        <p>{{$t('Warning')}} {{$t(warning)}}</p>
      </div>
    </div>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "WarningSnackbar",
  computed: {
    ...mapGetters(["warning"])
  },
  data() {
    return {
      open: false
    };
  },
  watch: {
    warning: function(val) {
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