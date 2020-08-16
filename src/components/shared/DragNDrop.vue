<template>
  <div :class="{onDrag}">
    <div v-if="onDrag" id="drop-description">
      <v-icon id="upload-icon">cloud_upload</v-icon>
      <p>{{$t('buttons.UploadFile')}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DragNDrop",
  data() {
    return {
      onDrag: false,
      dragCount: 0
    };
  },
  methods: {
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
        event => {
          event.preventDefault();
          this.dragCount += 1;
        },
        false
      );
      window.addEventListener(
        "dragleave",
        event => {
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
        event => {
          event.preventDefault();
          if (this.isFileDrag(event)) {
            this.onDrag = true;
          }
        },
        false
      );
      window.addEventListener(
        "drop",
        event => {
          event.preventDefault();
          if (this.isFileDrag(event)) {
            this.onDrag = false;
            const files = Object.values(event.dataTransfer.items).map(file =>
              file.getAsFile()
            );
            this.$store.dispatch("uploadFiles", files);
          }
        },
        false
      );
    }
  },
  created() {
    this.dragInit();
  }
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