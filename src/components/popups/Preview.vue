<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay>
    <v-card id="preview">
      <img v-if="file.type.startsWith('image')" class="auto-margin" :src="getFile" />
      <audio v-else-if="file.type.startsWith('audio')" :src="getFile" autoplay controls></audio>
      <iframe v-else :src="getPDF"></iframe>
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
  background-color: rgba(0, 0, 0, 0.637);
}
#close {
  color: #f0f3f8;
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>