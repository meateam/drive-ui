<template>
  <v-tooltip top :disabled="!icon" v-if="isSharedFile() && isSingleFile()">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="copy()"
        v-on="on"
        :icon="icon"
        :class="{ right: !icon }"
        class="auto-margin"
        id="move-button"
        text
      >
        <img class="image-ctcb" src="@/assets/icons/copylink.png" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.CopyLink") }}</p>
      </v-btn>
    </template>

    <span>{{ $t("buttons.CopyLink") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { isFolder } from "@/utils/isFolder";
import { isSharedFile } from "@/utils/isSharedFile";
import { isSingleFile } from "@/utils/isSingleFile";
import store from "@/store";

export default {
  name: "CopyToClipboard",
  props: ["icon"],
  computed: {
    ...mapGetters(["chosenFiles", "currentFolder"]),
  },
  methods: {
    copy() {
      const fileId = this.chosenFiles[0].id; 
      if (isFolder(this.chosenFiles[0].type)) navigator.clipboard.writeText(`${window.location.origin}/folder?id=${fileId}`);
      else navigator.clipboard.writeText(`${window.location.origin}/file?id=${fileId}`)
      store.commit("onSuccess", "success.CopyToClipboard");
    },
    isSharedFile() {
      return isSharedFile(this.chosenFiles, this.currentFolder);
    },
    isSingleFile() {
      return isSingleFile(this.chosenFiles);
    },
  },
};
</script>

<style>
.image-ctcb {
  width: 20px;
  height: 20px
}
</style>
