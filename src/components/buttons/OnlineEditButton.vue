<template>
  <v-tooltip top v-if="chosenFiles.length===1 && canEditOnline(chosenFiles[0])" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="onClick"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        id="online-edit-button"
        text
        :class="{right: !icon}"
      >
        <img class="fab-icon" src="@/assets/icons/file.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.EditOnline") }}</p>
      </v-btn>
    </template>
    <span>{{ $t("buttons.EditOnline") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { fileTypes } from "@/config";
import * as filesApi from "@/api/files";

export default {
  name: "OnlineEditButton",
  props: ["icon"],
  methods: {
    onClick() {
      filesApi.editOnline(this.chosenFiles[0].id);
    },
    canEditOnline(file) {
      return fileTypes.office.includes(file.type);
    }
  },
  computed: {
    ...mapGetters(["chosenFiles"])
  }
};
</script>