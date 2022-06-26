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
      <MoveToPopup ref="movePopup" :files="chosenFiles" @confirm="onSubmit" />
    </template>
    <span>{{ $t("buttons.Move") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { writeRole } from "@/utils/roles";
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
        (!(this.currentFolder || this.isSharedFile()) ||
          (this.currentFolder && writeRole(this.currentFolder.role))) &&
        this.chosenFiles.every((file) => writeRole(file.role)) &&
        !this.isFileReadOnly() 
      );
    },
    isSharedFile() {
      const firstFile =
        this.chosenFiles && this.chosenFiles.length > 0
          ? this.chosenFiles[0]
          : this.currentFolder;
      return firstFile && firstFile.shared;
    },
    isFileReadOnly() {
      return this.chosenFiles.every(
        (file) => file?.isReadOnly != undefined && file.isReadOnly || file?.onlyDelete !=undefined && file.onlyDelete
      );
    },
  },
};
</script>
