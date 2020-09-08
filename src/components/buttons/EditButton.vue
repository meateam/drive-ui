<template>
  <v-tooltip top v-if="canEdit()" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.rename.open()"
        v-on="on"
        :icon="icon"
        :class="{right: !icon}"
        class="auto-margin"
        id="edit-button"
        text
      >
        <img class="fab-icon" src="@/assets/icons/edit.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Edit") }}</p>
      </v-btn>
    </template>
    <NamePopup
      img="green-edit.svg"
      ref="rename"
      :value="chosenFiles[0].name"
      :type="isFolder() ? 'renameFolder' : 'renameFile'"
      @confirm="onConfirm"
    />
    <span>{{ $t("buttons.Edit") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { fileTypes } from "@/config";
import { writeRole } from "@/utils/roles";
import NamePopup from "../popups/BaseNamePopup";

export default {
  name: "EditButton",
  props: ["icon"],
  components: { NamePopup },
  computed: {
    ...mapGetters(["chosenFiles", "currentFolder"])
  },
  methods: {
    onConfirm(name) {
      this.$store.dispatch("editFile", { name, file: this.chosenFiles[0] });
    },
    isFolder() {
      return this.chosenFiles[0].type === fileTypes.folder;
    },
    canEdit() {
      return (
        this.chosenFiles.length === 1 &&
        (!this.currentFolder || writeRole(this.currentFolder.role)) &&
        this.chosenFiles.every(file => writeRole(file.role))
      );
    }
  }
};
</script>