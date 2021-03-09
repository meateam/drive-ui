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
      :sortable="sortable"
      @page="$emit('page', $event)"
    />

    <v-alert
      :value="isUpload"
      dismissible
      class="ma-0"
      color="#035c64"
      colored-border
      border="left"
      width="500"
    >
      <v-row align="center" no-gutters>
        <v-col cols="12" md="10">
          <v-list-item-title> sfdgfdg </v-list-item-title>
        </v-col>
        <v-col cols="12" md="2">
          <v-progress-circular
            class="ma-0"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-alert>

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
import { mapGetters } from "vuex";
import { Get } from "@/store/modules/upload";

export default {
  name: "PageTemplate",
  components: { FileView, FileViewButton, FabButton, DragNDrop, Breadcrumbs },
  props: [
    "files",
    "header",
    "upload",
    "breadcrumbs",
    "serverFilesLength",
    "sortable",
  ],
  computed: {
    ...mapGetters({
      isUpload: Get.isUpload,
    }),
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
</style>