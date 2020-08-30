<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <v-icon color="#007A99" class="popup-icon">share</v-icon>
        <p class="d-title">{{$t('share.link.Copy')}}</p>
      </div>
      <div class="popup-body">
        <div v-if="canEditOnline(file)">
          <p class="popup-text">{{$t('share.link.OnlyShare')}}</p>
          <v-text-field readonly :label="link" solo append-icon="content_copy" @click:append="copy"></v-text-field>
        </div>
        <div v-else class="popup-text" id="error">
          <p>{{$t('share.link.FileTypeError')}}</p>
          <p>{{getAllowedTypes()}}</p>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import * as filesApi from "@/api/files";
import { fileTypes } from "@/config";

export default {
  name: "LinkPopup",
  props: ["file"],
  data() {
    return {
      dialog: false,
      link: "",
    };
  },
  created() {
    this.link = filesApi.getFileLink(this.file.id);
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    copy() {
      this.$store.commit("onSuccess", "success.Copied");
      navigator.clipboard.writeText(this.link);
    },
    canEditOnline(file) {
      return fileTypes.office.includes(file.type);
    },
    getAllowedTypes() {
      return fileTypes.docs.toString().split(",").join(", ");
    },
  },
};
</script>

<style scoped>
.popup-icon {
  font-size: 70px;
  width: 100%;
  display: block;
  text-align: center;
}
#error {
  text-align: center;
}
</style>