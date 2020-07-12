<template>
  <div class="page-container">
    <div id="page-header">
      <div id="page-name" v-if="currentFolder">
        <Breadcrumbs
          :folders="currentFolderHierarchy"
          :currentFolder="currentFolder"
          @click="onBreadcrumbClick"
        />
      </div>
      <FileViewButton />
    </div>
    <FabButton />
    <FileView v-if="files" :files="files" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FileViewButton from "@/components/buttons/FileViewButton";
import Breadcrumbs from "@/components/shared/BaseBreadcrumbs";
import FileView from "@/components/files/FileView";
import FabButton from "@/components/buttons/FabButton";

export default {
  name: "Folder",
  components: { FabButton, FileView, FileViewButton, Breadcrumbs },
  created() {
    document.title = this.currentFolder.name;
    this.$store.dispatch("fetchFiles");
  },
  watch: {
    currentFolder: function() {
      this.$store.dispatch("fetchFiles");
    }
  },
  computed: {
    ...mapGetters(["files", "currentFolder", "currentFolderHierarchy"])
  },
  methods: {
    onBreadcrumbClick(folder) {
      if (!folder) {
        this.$router.push("/my-drive");
      } else {
        this.$router.push({ path: "/folders", query: { id: folder.id } });
      }
    }
  }
};
</script>

<style scoped>
#folder {
  width: 30px;
  height: 26px;
}
.space {
  margin: 0 8px;
}
#page-header {
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #357e6f;
}
#page-name {
  font-size: 30px;
  color: #2c3448;
  font-family: Rubik-light;
  font-weight: 400;
  display: flex;
  text-align: right;
}
</style>