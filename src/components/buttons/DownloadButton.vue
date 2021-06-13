<template>
  <v-tooltip top v-if="canDownload()" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="onDownload"
        :class="{ right: !icon }"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        id="download-button"
        text
      >
        <img class="fab-icon" src="@/assets/icons/download.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Download") }}</p>
      </v-btn>
    </template>
    <span>{{ $t("buttons.Download") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
// import { isFolder } from "@/utils/isFolder";
import * as filesApi from "@/api/files";

export default {
  name: "DownloadButton",
  props: ["icon"],
  methods: {
    onDownload() {
      let fileIDs = this.chosenFiles.map(file => file.id)
      if (fileIDs.length > 1) {
        filesApi.downloadMultipleFiles(fileIDs);  
      } else if (fileIDs.length == 1) {
        filesApi.downloadFile(fileIDs[0]);
      } 
    },
    canDownload() {
      return this.chosenFiles.length >= 1 && !this.isFileDeleted();
    },
    isFileDeleted() {
      return this.chosenFiles.every((file) => file?.isDeleted != undefined && file.isDeleted);
    },
  },
  computed: {
    ...mapGetters(["chosenFiles"]),
  },
};
</script>
