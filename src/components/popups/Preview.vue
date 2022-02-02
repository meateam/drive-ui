<template>
  <v-dialog
    v-if="dialog"
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="fade-transition"
  >
    <PreviewMenu @close="close" />
    <v-card id="preview" @click.native="close">
      <img
        @click.stop
        v-if="file.type.startsWith('image')"
        class="file-preview"
        :src="getFile"
      />
      <audio
        @click.stop
        v-else-if="file.type.startsWith('audio')"
        class="file-preview"
        :src="getFile"
        autoplay
        controls
      ></audio>
      <video
        @click.stop
        v-else-if="file.type.startsWith('video')"
        class="file-preview"
        controls
      >
        <source :src="getFile" :type="file.type" />
      </video>
      <iframe
        v-else-if="showPDF()"
        :src="getPDF"
        class="file-preview"
        frameborder="0"
        id="pdf"
        allowtransparency="true"
        style="background: #ffffff"
      ></iframe>
      <div @click.stop class="auto-margin" id="uavailable" v-else>
        <p>{{ $t("preview.Unavailable") }}</p>
      </div>
      <v-btn @click.stop="close" icon class="auto-margin" id="close">
        <v-icon>close</v-icon>
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import PreviewMenu from "./menus/PreviewMenu";
import { getPdfPreview, getPreview } from "@/api/files";
import { canPreviewPdf } from "@/utils/canPreview";

export default {
  name: "Preview",
  components: { PreviewMenu },
  data() {
    return {
      dialog: false,
      file: undefined,
    };
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$store.commit('changePopupStatus')
      } 
    },
  },
  methods: {
    open(file) {
      if (!this.$store.getters.popupStatus) {
        this.$store.commit('changePopupStatus');
        this.file = file;
        this.dialog = true;
      }
    },
    close() {
      this.dialog = false;
    },
    showPDF() {
      return canPreviewPdf(this.file.type);
    },
  },
  computed: {
    getFile() {
      return getPreview(this.file.id);
    },
    getPDF() {
      return getPdfPreview(this.file.id);
    },
  },
};
</script>

<style scoped>
#preview {
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
}
#close {
  color: #f0f3f8;
  position: absolute;
  top: 30px;
  right: 30px;
}
.file-preview {
  margin: auto;
  max-height: 80vh;
  max-width: 80%;
}
#pdf {
  height: 80vh;
  width: 80%;
}
#uavailable {
  border-radius: 12px;
  color: #fff;
  font-size: 20px;
  padding: 20px;
  text-align: center;
  background-color: #4c494c;
}
</style>