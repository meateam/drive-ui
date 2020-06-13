<template>
  <div class="page-container">
    <h1 class="page-header">{{currentFolder.name}}</h1>
    <Fab />
    <FileList v-bind:files="files" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Fab from "../components/shared/buttons/Fab";
import FileList from "@/components/files/list/FileList";

export default {
  name: "Folder",
  components: { Fab, FileList },
  created() {
    document.title = this.currentFolder.name;
    this.$store.dispatch("fetchFiles");
  },
  computed: {
    ...mapGetters(["files", "currentFolder"])
  }
};
</script>

<style scoped>
</style>