<template>
  <v-tooltip top :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn @click="$refs.popup.open()" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/delete.png" />
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
    <Snackbar ref="snackbar" />
    <span>{{ $t("buttons.Delete") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import DeletePopup from "../popups/DeletePopup";
import Snackbar from "../popups/Snackbar";

export default {
  name: "DeleteButton",
  props: ["icon"],
  components: { DeletePopup, Snackbar },
  methods: {
    onDelete() {
      const success =
        this.chosenFiles.length === 1
          ? this.$t("snackbar.DeleteItem")
          : this.$t("snackbar.DeleteItems");
      this.$store.dispatch("deleteFiles", this.chosenFiles).then(() => {
        this.$refs.snackbar.open(success);
      });
    }
  },
  computed: {
    ...mapGetters(["chosenFiles"])
  }
};
</script>
