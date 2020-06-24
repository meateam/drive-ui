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
    <span>{{ $t("buttons.Delete") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import DeletePopup from "../popups/DeletePopup";

export default {
  name: "Delete",
  props: ["icon"],
  components: { DeletePopup },
  methods: {
    onDelete() {
      this.$store.dispatch("deleteFiles", this.chosenFiles);
    }
  },
  computed: {
    ...mapGetters(["chosenFiles"])
  }
};
</script>
