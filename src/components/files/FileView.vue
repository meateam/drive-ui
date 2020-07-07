<template>
  <div>
    <FileTable v-if="!fileView" :files="files" />
    <FilesPreview v-else :files="files" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FileTable from "@/components/files/list/FileTable";
import FilesPreview from "@/components/files/preview/FilesPreview";

export default {
  name: "FileView",
  components: { FileTable, FilesPreview },
  props: ["files"],
  computed: {
    ...mapGetters(["fileView"])
  }
};
</script>

<style scoped>
</style>