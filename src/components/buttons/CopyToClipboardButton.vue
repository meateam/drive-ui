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
        <img style="width: 20px; height: 20px" src="@/assets/icons/copylink.png" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.CopyLink") }}</p>
      </v-btn>
    </template>

    <span>{{ $t("buttons.CopyLink") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { isFolder } from "@/utils/isFolder";

export default {
  name: "CopyToClipboard",
  props: ["icon"],
  computed: {
    ...mapGetters(["chosenFiles", "currentFolder"]),
  },
  methods: {
    copy() {
      if (isFolder(this.chosenFiles[0].type)) navigator.clipboard.writeText(`${window.location.origin}/folder?id=${this.chosenFiles[0].id}`);
      else navigator.clipboard.writeText(`${window.location.origin}/file?id=${this.chosenFiles[0].id}`)
      store.commit("onSuccess", "success.CopyToClipboard");
    },
    isSharedFile() {
      const firstFile = this.chosenFiles && this.chosenFiles.length > 0 ? this.chosenFiles[0] : this.currentFolder;
      return firstFile && firstFile.shared;
    },
    isSingleFile() {
      return this.chosenFiles && this.chosenFiles.length === 1;
    },
  },
};
</script>
