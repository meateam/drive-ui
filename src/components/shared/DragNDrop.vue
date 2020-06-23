<template>
  <div
    class="drag-container"
    @dragenter="onDragEnter"
    @dragleave="onDragEnd"
    :class="{active: drag}"
  >
    <div v-if="drag">
      <img id="upload-img" src="@/assets/icons/uploadFile.png" />
      <h1>{{$t('')}}</h1>
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
#upload-img {
  position: fixed;
  width: 60px;
  right: calc(50vw - 30px);
}
</style>