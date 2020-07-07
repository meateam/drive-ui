<template>
  <v-tooltip top :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn @click="$refs.movePopup.open()" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/move.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Move") }}</p>
      </v-btn>
    </template>
    <MovePopup ref="movePopup" :files="chosenFiles" @confirm="onSubmit" />
    <span>{{ $t("buttons.Move") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import MovePopup from "../popups/MovePopup";

export default {
  name: "MoveButton",
  props: ["icon"],
  components: { MovePopup },
  computed: {
    ...mapGetters(["chosenFiles", "currentFolder"])
  },
  methods: {
    onSubmit(folderID) {
      if (folderID === this.currentFolder) return;
      this.$store.dispatch("moveFile", {
        folderID,
        fileIDs: this.chosenFiles.map(file => file.id)
      });
    }
  }
};
</script>