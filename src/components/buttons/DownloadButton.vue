<template>
  <v-tooltip top v-if="chosenFiles.length===1" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn @click="onDownload" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/download.png" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Download") }}</p>
      </v-btn>
    </template>
    <span>{{ $t("buttons.Download") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DownloadButton",
  props: ["icon"],
  methods: {
    onDownload() {
      this.$store.dispatch("downloadFile", this.chosenFiles[0].id);
    }
  },
  computed: {
    ...mapGetters(["chosenFiles"])
  }
};
</script>