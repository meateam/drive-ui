<template>
  <div></div>
</template>

<script>
import { UploadGet } from "@/store/modules/upload";
import { mapGetters } from "vuex";
import { getFilesFromDroppedItems } from "@/utils/drop";

export default {
  name: "DragNDrop",
  data() {
    return {
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
        },
        false
      );
      window.addEventListener(
        "dragover",
        (event) => {
          event.preventDefault();
        },
        false
      );
      window.addEventListener(
        "drop",
        async (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          if (this.isFileDrag(event)) {
            await this.getFilesFromDroppedItems(
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
</style>