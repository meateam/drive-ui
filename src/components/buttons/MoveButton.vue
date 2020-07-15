<template>
  <v-tooltip top :disabled="!icon" v-if="canMove()">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.movePopup.open()"
        v-on="on"
        :icon="icon"
        :class="{right: !icon}"
        class="auto-margin"
        text
      >
        <v-icon class="fab-icon" color="#f0f4f7">arrow_right_alt</v-icon>
        <p class="button-text" v-if="!icon">{{ $t("buttons.Move") }}</p>
      </v-btn>
    </template>
    <MovePopup ref="movePopup" :files="chosenFiles" @confirm="onSubmit" />
    <span>{{ $t("buttons.Move") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { writeRole } from "@/utils/roles";
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
    },
    canMove() {
      return (
        (!this.currentFolder || writeRole(this.currentFolder.role)) &&
        this.chosenFiles.every(file => writeRole(file.role))
      );
    }
  }
};
</script>