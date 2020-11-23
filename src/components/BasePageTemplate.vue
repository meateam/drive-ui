<template>
  <div class="page-container">
    <div id="page-header">
      <h1 v-if="!breadcrumbs" id="page-name">{{ header }}</h1>
      <div v-else>
        <Breadcrumbs
          page="true"
          :items="breadcrumbs"
          @click="$emit('breadcrumb', $event)"
        />
      </div>

      <FileViewButton />
    </div>

    <FileView
      v-if="files"
      :files="files"
      :serverFilesLength="serverFilesLength"
      @page="$emit('page', $event)"
    />

    <DragNDrop v-if="upload" />
    <FabButton v-if="upload" />
  </div>
</template>

<script>
import FileViewButton from "@/components/buttons/FileViewButton";
import FileView from "@/components/files/FileView";
import FabButton from "@/components/buttons/FabButton";
import Breadcrumbs from "@/components/shared/BaseBreadcrumbs";
import DragNDrop from "@/components/shared/DragNDrop";

export default {
  name: "PageTemplate",
  components: { FileView, FileViewButton, FabButton, DragNDrop, Breadcrumbs },
  props: ["files", "header", "upload", "breadcrumbs", "serverFilesLength"],
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
</style>