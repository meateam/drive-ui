<template>
  <v-tooltip top :disabled="!icon" v-if="canDelete()">
    <template v-slot:activator="{ on }">
      <v-btn
        id="delete-button"
        @click="$refs.popup.open()"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        :class="{right: !icon}"
        text
      >
        <img class="fab-icon" src="@/assets/icons/delete.svg" />
        <p
          class="button-text"
          v-if="!icon"
        >{{ isUserOwner()? $t("buttons.Delete"): $t('buttons.RemoveShare') }}</p>
      </v-btn>
    </template>
    <AlertPopup
      ref="popup"
      @delete="onDelete"
      img="deletePopup.svg"
      :text="$t('file.Delete')"
      :button="$t('buttons.DeleteNow')"
    />
    <span>{{ isUserOwner()? $t("buttons.Delete"): $t('buttons.RemoveShare') }}</span>
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
      this.$store.dispatch("deleteFiles", this.chosenFiles);
    },
    canDelete() {
      return !this.currentFolder || writeRole(this.currentFolder.role);
    },
    isUserOwner() {
      return this.chosenFiles.every((file) => ownerRole(file.role));
    },
  },
  computed: {
    ...mapGetters(["chosenFiles", "currentFolder"]),
  },
};
</script>
