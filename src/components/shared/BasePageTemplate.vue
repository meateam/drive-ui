<template>
  <div class="page-container">
    <div id="page-header">
      <h1 id="page-name">{{header}}</h1>
      <FileViewButton />
    </div>

    <FileView v-if="files" :files="files" />

    <FabButton v-if="upload" />
  </div>
</template>

<script>
import FileViewButton from "@/components/buttons/FileViewButton";
import FileView from "@/components/files/FileView";
import FabButton from "@/components/buttons/FabButton";

export default {
  name: "PageTemplate",
  components: { FileView, FileViewButton, FabButton },
  props: ["files", "header", "upload"]
};
</script>

<style scoped>
#page-header {
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #035c64;
}
#page-name {
  font-size: 40px;
  color: #2c3448;
  font-family: Rubik-light;
  font-weight: 400;
  text-align: right;
}
</style>