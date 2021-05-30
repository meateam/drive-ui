<template>
  <div :class="{ onDrag }">
    <div v-if="onDrag" id="drop-description">
      <v-icon id="upload-icon">cloud_upload</v-icon>
      <p>{{ $t("buttons.UploadFile") }}</p>
    </div>
  </div>
</template>

<script>

import { UploadGet } from "@/store/modules/upload";
import { mapGetters } from "vuex";
import { getFilesFromDroppedItems } from "./../../utils/drop";

export default {
  name: "DragNDrop",
  data() {
    return {
      onDrag: false,
      dragCount: 0,
    };
  },
  computed: {
    ...mapGetters({
      currentFolder: "currentFolder",
      isUpload: UploadGet.isUpload,
    }),
  },
  methods: {
    getFilesFromDroppedItems,
    isFileDrag(event) {
      if (event.dataTransfer.types) {
        for (let i = 0; i < event.dataTransfer.types.length; i++) {
          if (event.dataTransfer.types[i] == "Files") {
            return true;
          }
        }
      }
      return false;
    },
    dragInit() {
      window.addEventListener(
        "dragenter",
        (event) => {
          event.preventDefault();
          this.dragCount += 1;
        },
        false
      );
      window.addEventListener(
        "dragleave",
        (event) => {
          event.preventDefault();
          this.dragCount -= 1;
          if (this.isFileDrag(event) && !this.dragCount) {
            this.onDrag = false;
          }
        },
        false
      );
      window.addEventListener(
        "dragover",
        (event) => {
          event.preventDefault();
          if (this.isFileDrag(event)) {
            this.onDrag = true;
          }
        },
        false
      );
      window.addEventListener(
        "drop",
        async (event) => {
          this.onDrag = false;
          event.preventDefault();
          event.stopImmediatePropagation();
          if (this.isFileDrag(event)) {
            this.getFilesFromDroppedItems(
              event.dataTransfer,
              this.currentFolder
            );
          }
        },
        false
      );
    },
  },
  created() {
    this.dragInit();
  },
};
</script>

<style scoped>
.onDrag {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
#upload-icon {
  color: #035c64;
  display: block;
  font-size: 250px;
}
#drop-description {
  display: block;
  margin: auto;
  margin-top: 15%;
  text-align: center;
  font-size: 30px;
}
</style>