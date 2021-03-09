<template>
  <v-tooltip top v-if="chosenFiles.length === 1" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="isFileDeleted() ? $refs.deletedPopup.open() : $refs.popup.open()"
        v-on="on"
        :icon="icon"
        :class="{ right: !icon }"
        class="auto-margin"
        id="info-button"
        text
      >
        <img class="fab-icon" src="@/assets/icons/info.svg" />
        <p class="button-text" v-if="!icon">{{ isFolder() ? $t("buttons.FolderInfo") : $t("buttons.FileInfo") }}</p>
      </v-btn>
    </template>
    <InfoPopup ref="popup" :file="chosenFiles[0]" />
    <AlertPopup ref="deletedPopup" img="deleted.svg" :text="$t('fileInfo.Deleted')" />
    <span>{{ isFolder() ? $t("buttons.FolderInfo") : $t("buttons.FileInfo") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { fileTypes } from "@/config";
import InfoPopup from "@/components/popups/info-popup/BaseInfoPopup";
import AlertPopup from "@/components/popups/BaseAlertPopup";

export default {
  name: "InfoButton",
  props: ["icon"],
  computed: {
    ...mapGetters(["chosenFiles"]),
  },
  methods: {
    isFolder() {
      return this.chosenFiles[0].type === fileTypes.folder;
    },
    isFileDeleted() {
      return this.chosenFiles[0]?.isDeleted != undefined && this.chosenFiles[0].isDeleted;
    },
  },
  components: { InfoPopup, AlertPopup },
};
</script>
