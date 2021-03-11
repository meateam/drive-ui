<template>
  <v-tooltip top v-if="chosenFiles.length === 1 && isPreviewAvailable()" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="isFileDeleted() ? $refs.deletedPopup.open() : $refs.popup.open(chosenFiles[0])"
        v-on="on"
        :icon="icon"
        :class="{ right: !icon }"
        class="auto-margin"
        id="preview-button"
        text
      >
        <img class="fab-icon" src="@/assets/icons/preview.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Preview") }}</p>
      </v-btn>
    </template>
    <Preview ref="popup" />
    <AlertPopup ref="deletedPopup" cancelButton="true" img="deleted.svg" :text="$t('preview.Deleted')" />

    <span>{{ $t("buttons.Preview") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { canPreview } from "@/utils/canPreview";
import Preview from "@/components/popups/Preview";
import AlertPopup from "@/components/popups/BaseAlertPopup";

export default {
  name: "PreviewButton",
  props: ["icon"],
  computed: {
    ...mapGetters(["chosenFiles"]),
  },
  methods: {
    isPreviewAvailable() {
      return this.isFileDeleted() || canPreview(this.chosenFiles[0].type);
    },
    isFileDeleted() {
      return this.chosenFiles[0]?.isDeleted != undefined && this.chosenFiles[0].isDeleted;
    },
  },
  components: { Preview, AlertPopup },
};
</script>
