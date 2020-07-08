<template>
  <v-tooltip top v-if="chosenFiles.length===1 || file" :disabled="!icon || file">
    <template v-slot:activator="{ on }">
      <v-btn @click="onDownload" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/download.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Download") }}</p>
      </v-btn>
    </template>
    <span>{{ $t("buttons.Download") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import * as filesApi from "@/api/files";

export default {
  name: "DownloadButton",
  props: ["icon", "file"],
  methods: {
    onDownload() {
      filesApi.downloadFile(
        this.file.id ? this.file.id : this.chosenFiles[0].id
      );
    }
  },
  computed: {
    ...mapGetters(["chosenFiles"])
  }
};
</script>