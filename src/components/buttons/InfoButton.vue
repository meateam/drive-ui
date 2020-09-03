<template>
  <v-tooltip top v-if="chosenFiles.length===1" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.popup.open()"
        v-on="on"
        :icon="icon"
        :class="{right: !icon}"
        class="auto-margin"
        id="info-button"
        text
      >
        <img class="fab-icon" src="@/assets/icons/info.svg" />
        <p
          class="button-text"
          v-if="!icon"
        >{{ isFolder()? $t("buttons.FolderInfo"): $t("buttons.FileInfo") }}</p>
      </v-btn>
    </template>
    <InfoPopup ref="popup" :file="chosenFiles[0]" />
    <span>{{ isFolder()? $t("buttons.FolderInfo"): $t("buttons.FileInfo") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { fileTypes } from "@/config";
import InfoPopup from "@/components/popups/info-popup/BaseInfoPopup";

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
  },
  components: { InfoPopup },
};
</script>