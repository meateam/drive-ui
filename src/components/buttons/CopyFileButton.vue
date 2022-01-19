<template>
  <v-tooltip top :disabled="!icon" v-if="copyButtonAppear()">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.copyPopup.openMyDrive()"
        v-on="on"
        :icon="icon"
        :class="{ right: !icon }"
        class="auto-margin"
        id="move-button"
        text
      >
        <img class="fab-icon" src="@/assets/icons/make-a-copy.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.MakeCopy") }}</p>
      </v-btn>
    </template>

    <CopyFilePopup ref="copyPopup" :files="chosenFiles" @confirm="onSubmit" />
    <span>{{ $t("buttons.MakeCopy") }}</span>
  </v-tooltip>
</template>

<script>
import CopyFilePopup from "@/components/popups/CopyFilePopup";
import { mapGetters } from "vuex";
import { isFolder } from "@/utils/isFolder";

export default {
  name: "CopyFileButton",
  props: ["icon"],
  components: { CopyFilePopup },
  computed: {
    ...mapGetters(["chosenFiles", "currentFolder"]),
  },
  methods: {
    copyButtonAppear() {
      return this.chosenFiles.every((file) => !isFolder(file.type) && this.chosenFiles.length <= 1);
    },
    onSubmit(folderID) {
      this.$store.dispatch("copyFile", {
        fileID: this.chosenFiles[0].id,
        folderID,
      });

      if (folderID) {
        this.$router.push({ path: "/folders", query: { id: folderID } });
      } else if (this.$router.currentRoute.path === "/favorites" || this.$router.currentRoute.path === "/shared-with-me") {
          this.$router.push("/my-drive")
      }
      this.$emit("close");
    },
  },
};
</script>
