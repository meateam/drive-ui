<template>
  <div>
    <FileTable v-if="files" :files="files" />
    <FilesPreview v-if="files" :files="files" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FabButton from "@/components/buttons/FabButton";
import FileTable from "@/components/files/list/FileTable";
import FilesPreview from "@/components/files/preview/FilesPreview";

export default {
  name: "MyDrive",
  components: { FabButton, FileTable, FilesPreview },
  computed: {
    ...mapGetters(["files"])
  }
};
</script>

<style scoped>
</style>