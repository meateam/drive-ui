<template>
  <div class="page-container">
    <div id="page-header">
      <h1 id="page-name">{{header}}</h1>
      <FileViewButton />
    </div>

    <FileView v-if="files" :files="files" />

    <DragNDrop v-if="upload" />
    <FabButton v-if="upload" />
  </div>
</template>

<script>
import FileViewButton from "@/components/buttons/FileViewButton";
import FileView from "@/components/files/FileView";
import FabButton from "@/components/buttons/FabButton";
import DragNDrop from "@/components/shared/DragNDrop"

export default {
  name: "PageTemplate",
  components: { FileView, FileViewButton, FabButton, DragNDrop },
  props: ["files", "header", "upload"]
};
</script>

<style scoped>
#page-header {
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #357e6f;
}
#page-name {
  font-size: 40px;
  color: #2c3448;
  font-family: Rubik-light;
  font-weight: 400;
  text-align: right;
}
</style>