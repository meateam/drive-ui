<template>
  <v-tooltip top :disabled="!icon" v-if="copyButtonAppear()">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.copyPopup.open()"
        v-on="on"
        :icon="icon"
        :class="{ right: !icon }"
        class="auto-margin"
        id="move-button"
        text
      >
        <img class="fab-icon" src="@/assets/icons/move-to.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.MakeCopy") }}</p>
      </v-btn>
    </template>

    <CopyFilePopup ref="copyPopup" :files="chosenFiles" @confirm="onSubmit" />
    <span>{{ $t("buttons.MakeCopy") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { writeRole } from "@/utils/roles";
import CopyFilePopup from "@/components/popups/CopyFilePopup";
import { isFolder } from "@/utils/isFolder";

export default {
  name: "CopyFileButton",
  props: ["icon"],
  components: { CopyFilePopup },
  computed: {
    ...mapGetters(["chosenFiles", "currentFolder"]),
  },
  data() {
    return {
    };
  },
  methods: {
    copyButtonAppear() {
      console.log('here');
      return this.chosenFiles.every((file) => !isFolder(file.type)) ? true : false;
    },
    onSubmit(folderID) {
      this.$store.dispatch("copyFile", {
        fileID: this.chosenFiles[0].id,
        folderID,
      });
      // this.$store.dispatch("fetchFiles", folderID);
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
        (file) => file?.isReadOnly != undefined && file.isReadOnly
      );
    },
  },
};
</script>