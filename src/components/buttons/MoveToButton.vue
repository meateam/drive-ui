<template>
  <v-tooltip top :disabled="!icon" v-if="canMove()">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.movePopup.open()"
        v-on="on"
        :icon="icon"
        :class="{ right: !icon }"
        class="auto-margin"
        id="move-button"
        text
      >
        <img class="fab-icon" src="@/assets/icons/move-to.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Move") }}</p>
      </v-btn>
    </template>

    <MoveToPopup ref="movePopup" :files="chosenFiles" @confirm="onSubmit" />
    <span>{{ $t("buttons.Move") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { ownerRole } from "@/utils/roles";
import MoveToPopup from "@/components/popups/MoveToPopup";

export default {
  name: "MoveToButton",
  props: ["icon"],
  components: { MoveToPopup },
  computed: {
    ...mapGetters(["chosenFiles", "currentFolder"]),
  },
  methods: {
    onSubmit(folderID) {
      if (folderID === this.currentFolder) return;
      this.$store.dispatch("moveFiles", {
        folderID,
        fileIDs: this.chosenFiles.map((file) => file.id),
      });
      this.$emit("close");
    },
    canMove() {
      return (
        (!this.currentFolder || ownerRole(this.currentFolder.role)) &&
        this.chosenFiles.every((file) => ownerRole(file.role)) &&
        !this.isFileReadOnly()
      );
    },
    isFileReadOnly() {
      return this.chosenFiles.every((file) => file?.isReadOnly != undefined && file.isReadOnly);
    },
  },
};
</script>
