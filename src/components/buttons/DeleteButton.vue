<template>
  <v-tooltip top :disabled="!icon" v-if="canDelete()">
    <template v-slot:activator="{ on }">
      <v-btn
        id="delete-button"
        v-shortkey="{ delete: ['del'], backspace: ['backspace'] }"
        @shortkey="$refs.popup.open()"
        @click="$refs.popup.open()"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        :class="{ right: !icon }"
        text
      >
        <img class="fab-icon" src="@/assets/icons/delete.svg" />
        <p class="button-text" v-if="!icon">
          {{ isUserOwner() ? $t("buttons.Delete") : $t("buttons.RemoveShare") }}
        </p>
      </v-btn>
      <AlertPopup
        ref="popup"
        @confirm="onDelete"
        img="deletePopup.svg"
        :text="$t('file.Delete')"
        :button="$t('buttons.DeleteNow')"
      />
    </template>
    <span>{{
      isUserOwner() ? $t("buttons.Delete") : $t("buttons.RemoveShare")
    }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { writeRole, ownerRole } from "@/utils/roles";
import AlertPopup from "../popups/BaseAlertPopup";

export default {
  name: "DeleteButton",
  props: ["icon"],
  components: { AlertPopup },
  methods: {
    onDelete() {
      this.isUserOwner()
        ? this.$store.dispatch("deleteFiles", this.chosenFiles)
        : this.$store.dispatch("removePermissions", this.chosenFiles);
      this.$emit("close");
    },
    canDelete() {
      return (
        (!this.currentFolder || writeRole(this.currentFolder.role)) &&
        !this.isFileReadOnly()
      );
    },
    isUserOwner() {
      return this.chosenFiles.every((file) => ownerRole(file.role));
    },
    isFileReadOnly() {
      return this.chosenFiles.every(
        (file) => file?.isReadOnly != undefined && file.isReadOnly
      );
    },
  },
  computed: {
    ...mapGetters(["chosenFiles", "currentFolder"]),
  },
};
</script>
