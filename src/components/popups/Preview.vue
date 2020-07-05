<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="fade-transition">
    <v-card id="preview">
      <img v-if="file.type.startsWith('image')" class="file-preview" :src="getFile" />
      <audio
        v-else-if="file.type.startsWith('audio')"
        class="file-preview"
        :src="getFile"
        autoplay
        controls
      ></audio>
      <iframe v-else :src="getPDF" class="file-preview"></iframe>
      <v-btn @click="close" icon class="auto-margin" id="close">
        <v-icon>close</v-icon>
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { baseURL } from "@/utils/config";

export default {
  name: "Preview",
  props: ["file"],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    }
  },
  computed: {
    getFile() {
      return `${baseURL}/api/files/${this.file.id}?alt=media&inline=true`;
    },
    getPDF() {
      return `${baseURL}/api/files/${this.file.id}?alt=media&preview`;
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
</style>