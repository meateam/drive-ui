<template>
  <v-tooltip top v-if="chosenFiles.length === 1 && canEditOnline(chosenFiles[0])" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="onClick"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        id="online-edit-button"
        text
        :class="{ right: !icon }"
      >
        <img class="fab-icon" src="@/assets/icons/file.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.EditOnline") }}</p>
      </v-btn>
    </template>
    <span>{{ $t("buttons.EditOnline") }}</span>

    <AlertPopup
      ref="convertPopup"
      @confirm="editOnline"
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
  name: "OnlineEditButton",
  props: ["icon"],
  components: { AlertPopup },
  methods: {
    onClick() {
      if (this.isOldOfficeType(this.chosenFiles[0])) {
        this.$refs.convertPopup.open();
      } else {
        this.editOnline(this.chosenFiles[0]);
      }
    },
    editOnline(file) {
      filesApi.editOnline(file.id);
    },
    canEditOnline(file) {
      return (
        (fileTypes.office.includes(file.type) || fileTypes.oldOffice.includes(file.type)) && !this.isFileReadOnly()
      );
    },
    isFileReadOnly() {
      return this.chosenFiles.every((file) => file?.isReadOnly != undefined && file.isReadOnly);
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
