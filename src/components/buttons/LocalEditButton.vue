<template>
  <v-tooltip
    top
    v-if="chosenFiles.length === 1 && canEditLocally(chosenFiles[0])"
    :disabled="!icon"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        @click="onClick"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        id="local-edit-button"
        text
        :class="{ right: !icon }"
      >
        <img class="fab-icon adapt-color-white" src="@/assets/icons/screen.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.EditLocally") }}</p>
      </v-btn>
    </template>
    <span>{{ $t("buttons.EditLocally") }}</span>

    <AlertPopup
      ref="convertPopup"
      @confirm="editLocally"
      img="greenConvertFile.svg"
      :text="$t(`file.${convertMessage(chosenFiles[0])}`)"
      :button="$t('buttons.ConvertNow')"
      :data="this.chosenFiles[0]"
    />
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { fileTypes } from "@/config";
import { convertMessageType } from "@/utils/convertMessage";
import * as filesApi from "@/api/files";
import AlertPopup from "@/components/popups/BaseAlertPopup";

export default {
  name: "LocalEditButton",
  props: ["icon"],
  components: { AlertPopup },
  methods: {
    onClick() {
      if (this.isOldOfficeType(this.chosenFiles[0])) {
        this.$refs.convertPopup.open();
      } else {
        this.editLocally(this.chosenFiles[0]);
      }
    },
    editLocally(file) {
      filesApi.editLocally(file.id);
    },
    canEditLocally(file) {
      return (
        fileTypes.office.includes(file.type) ||
        fileTypes.oldOffice.includes(file.type)
      );
    },
    isOldOfficeType(file) {
      return fileTypes.oldOffice.includes(file.type);
    },
    convertMessage(file) {
      if (file) {
        return convertMessageType(file.type);
      }
    },
  },
  computed: {
    ...mapGetters(["chosenFiles"]),
  },
};
</script>