<template>
  <v-tooltip top v-if="chosenFiles.length===1 && canEdit()" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="onClick"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        text
        :class="{right: !icon}"
      >
        <img class="fab-icon" src="@/assets/icons/edit-online.svg" />
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
  props: ["icon", "file"],
  methods: {
    onClick() {
      filesApi.editOnline(this.chosenFiles[0].id);
    },
    canEdit() {
      return fileTypes.office.includes(this.chosenFiles[0].type);
    }
  },
  computed: {
    ...mapGetters(["chosenFiles"])
  }
};
</script>