<template>
  <div class="page-container">
    <div id="page-header">
      <h1 id="page-name">{{header}}</h1>
      <FileViewButton />
    </div>

    <FileView v-if="files" :files="files" />
  </div>
</template>

<script>
import FileViewButton from "@/components/buttons/FileViewButton";
import FileView from "@/components/files/FileView";

export default {
  name: "PageTemplate",
  components: { FileView, FileViewButton },
  props: ["files", "header"]
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