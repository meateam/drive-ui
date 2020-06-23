<template>
  <div
    class="drag-container"
    @dragenter.prevent="onDragEnter"
    @dragleave.prevent="onDragEnd"
    @drop.prevent="onDrop"
    :class="{active: drag}"
  >
    <div v-if="drag" id="upload">
      <img id="upload-img" class="auto-margin" src="@/assets/icons/uploadFile.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DragNDrop",
  data() {
    return {
      drag: false
    };
  },
  methods: {
    onDragEnter() {
      this.drag = true;
    },
    onDragEnd() {
      this.drag = false;
    },
    onDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (!files) return;
      this.$store.dispatch("uploadFiles", files);
      this.onDragEnd();
    }
  }
};
</script>

<style scoped>
.drag-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: -1;
  left: 0;
}
.active {
  backdrop-filter: blur(2px);
  z-index: 10;
}
#upload {
  position: fixed;
  z-index: 0;
  width: 200px;
  background-color: white;
  height: 200px;
  border-radius: 50%;
  right: calc(50vw - 100px);
  top: calc(50vh - 100px);
}
#upload-img {
  width: 60px;
  margin-top: 65px;
}
</style>