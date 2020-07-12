<template>
  <v-tooltip top :disabled="!icon" v-if="canDelete()">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.popup.open()"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        :class="{right: !icon}"
        text
      >
        <img class="fab-icon" src="@/assets/icons/delete.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Delete") }}</p>
      </v-btn>
    </template>
    <DeletePopup
      ref="popup"
      @delete="onDelete"
      img="deletePopup.svg"
      :text="$t('file.Delete')"
      :button="$t('buttons.DeleteNow')"
    />
    <span>{{ $t("buttons.Delete") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteRole } from "@/utils/roles";
import DeletePopup from "../popups/BaseDeletePopup";

export default {
  name: "DeleteButton",
  props: ["icon"],
  components: { DeletePopup },
  methods: {
    onDelete() {
      this.$store.dispatch("deleteFiles", this.chosenFiles);
    },
    canDelete() {
      return !this.currentFolder || deleteRole(this.currentFolder.role);
    }
  },
  computed: {
    ...mapGetters(["chosenFiles", "currentFolder"])
  }
};
</script>
