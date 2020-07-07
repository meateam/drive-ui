<template>
  <v-btn-toggle id="toggle-button" v-model="view" rounded dense borderless color="primary">
    <v-btn>
      <img class="view-icon" src="@/assets/icons/list-view.svg" />
    </v-btn>
    <v-btn>
      <img class="view-icon" src="@/assets/icons/preview-view.svg" />
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import { mapGetters } from "vuex";

mapGetters;
export default {
  name: "FileViewButton",
  computed: {
    ...mapGetters(["fileView"])
  },
  data() {
    return {
      view: this.fileView
    };
  },
  watch: {
    view: function(val) {
      this.$store.dispatch("toggleFileView", val);
    }
  }
};
</script>

<style scoped>
#toggle-button {
  direction: ltr;
}
.view-icon {
  width: 15px;
}
.theme--light.v-btn-toggle:not(.v-btn-toggle--group) {
  background-color: transparent;
}
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: white;
}
.v-btn-toggle {
  width: 50px;
}
.v-btn-toggle > .v-btn.v-btn {
  padding: 0;
  opacity: 1;
}
</style>