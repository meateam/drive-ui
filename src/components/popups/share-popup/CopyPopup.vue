<template>
  <v-card class="top-space">
    <div>
      <div class="share-header flex">
        <v-icon class="share-icon" color="#fff9e5">share</v-icon>
        <p class="share-title">{{getLinkType()}}</p>
      </div>

      <p class="link">{{$t('share.link.OnlyShare')}}</p>

      <v-card-actions class="popup-confirm">
        <v-btn text small @click="copy" class="link">
          <p>{{$t('buttons.CopyLink')}}</p>
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { fileTypes } from "@/config";

export default {
  name: "CopyPopup",
  props: ["link", "file"],
  methods: {
    copy() {
      navigator.clipboard.writeText(this.link);
      this.$store.commit("onSuccess", "success.Copied");
    },
    getLinkType() {
      const type = this.file.type;
      if (type === fileTypes.folder) {
        return this.$t("share.link.FolderLink");
      } else if (fileTypes.office.includes(type)) {
        return this.$t("share.link.EditOnlineLink");
      } else {
        return this.$t("share.link.DownloadLink");
      }
    },
  },
};
</script>

<style scoped>
.link {
  margin: 5px 25px;
  font-size: 15px;
  color: #353446;
}
</style>