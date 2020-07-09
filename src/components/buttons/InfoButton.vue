<template>
  <v-tooltip top v-if="chosenFiles.length===1" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.popup.open()"
        v-on="on"
        :icon="icon"
        :class="{right: !icon}"
        class="auto-margin"
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
    <span v-if="isFolder()">{{ isFolder()? $t("buttons.FolderInfo"): $t("buttons.FileInfo") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import InfoPopup from "@/components/popups/BaseInfoPopup";

export default {
  name: "InfoButton",
  props: ["icon"],
  computed: {
    ...mapGetters(["chosenFiles", "folderContentType"])
  },
  methods: {
    isFolder() {
      return this.chosenFiles[0].type === this.folderContentType;
    }
  },
  components: { InfoPopup }
};
</script>