<template>
  <v-tooltip top :disabled="!icon" v-if="isSharedFile() && isSingleFile()">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="copy()"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        id="move-button"
        :class="{ right: !icon }"
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
import store from "@/store";
import { mapGetters } from "vuex";
import { isFolder } from "@/utils/isFolder";
import { isSharedFile } from "@/utils/isSharedFile";
import { isSingleFile } from "@/utils/isSingleFile";

export default {
  name: "CopyToClipboard",
  props: ["icon"],
  computed: {
    ...mapGetters(["chosenFiles", "currentFolder"]),
  },
  methods: {
    copy() {
      const fileId = this.chosenFiles[0].id;
      const chosenFileType = this.chosenFiles[0].type;
      const url = `${window.location.origin}/${isFolder(chosenFileType) ? 'folders' : 'file'}?id=${fileId}`;
      navigator.clipboard.writeText(url);
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
