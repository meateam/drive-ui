<template>
  <v-dialog v-if="dialog" v-model="dialog" fullscreen hide-overlay transition="fade-transition">
    <v-card id="preview">
      <img v-if="file.type.startsWith('image')" class="file-preview" :src="getFile" />
      <audio
        v-else-if="file.type.startsWith('audio')"
        class="file-preview"
        :src="getFile"
        autoplay
        controls
      ></audio>
      <video v-else-if="file.type.startsWith('video')" class="file-preview" controls>
        <source :src="getFile" :type="file.type" />
      </video>
      <iframe v-else-if="showPDF()" :src="getPDF" class="file-preview" frameborder="0" id="pdf"></iframe>
      <div class="auto-margin" id="uavailable" v-else>
        <p>{{$t('preview.Unavailable')}}</p>
        <DownloadButton :file="file" :icon="true" class="auto-margin" />
      </div>
      <v-btn @click="close" icon class="auto-margin" id="close">
        <v-icon>close</v-icon>
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { getPdfPreview, getImagePreview } from "@/api/files";
import { canPreviewPdf } from "@/utils/canPreview";
import DownloadButton from "@/components/buttons/DownloadButton";

export default {
  name: "Preview",
  data() {
    return {
      dialog: false,
      file: undefined
    };
  },
  components: { DownloadButton },
  methods: {
    open(file) {
      this.file = file;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    showPDF() {
      return canPreviewPdf(this.file.type);
    }
  },
  computed: {
    getFile() {
      return getImagePreview(this.file.id);
    },
    getPDF() {
      return getPdfPreview(this.file.id);
    }
  }
};
</script>

<style scoped>
#preview {
  background-color: rgba(0, 0, 0, 0.8);
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