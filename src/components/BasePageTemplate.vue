<template>
  <div class="page-container">
    <div id="page-header">
      <h1 v-if="!folder" id="page-name">{{header}}</h1>
      <div v-else id="page-breadcrumbs">
        <Breadcrumbs
          :folders="currentFolderHierarchy"
          :currentFolder="currentFolder"
          @click="$emit('breadcrumb', $event)"
        />
      </div>

      <FileViewButton />
    </div>

    <FileView v-if="files" :files="files" />

    <DragNDrop v-if="upload" />
    <FabButton v-if="upload" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FileViewButton from "@/components/buttons/FileViewButton";
import FileView from "@/components/files/FileView";
import FabButton from "@/components/buttons/FabButton";
import Breadcrumbs from "@/components/shared/BaseBreadcrumbs";
import DragNDrop from "@/components/shared/DragNDrop";

export default {
  name: "PageTemplate",
  components: { FileView, FileViewButton, FabButton, DragNDrop, Breadcrumbs },
  props: ["files", "header", "upload", "folder"],
  computed: {
    ...mapGetters(["currentFolder", "currentFolderHierarchy"]),
  },
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
  font-family: Assistant-ExtraBold;
  font-weight: 400;
  text-align: right;
}
#page-breadcrumbs {
  font-size: 30px;
  color: #2c3448;
  font-family: Assistant-light;
  font-weight: 400;
  display: flex;
  text-align: right;
}
</style>