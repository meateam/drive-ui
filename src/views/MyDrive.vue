<template>
  <div class="page-container">
    <h1 class="page-header">{{$t('myDrive.header')}}</h1>
    <Fab />
    <FileList v-bind:files="files" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Fab from "@/components/shared/buttons/Fab";
import FileList from "@/components/files/list/FileList";

export default {
  name: "MyDrive",
  components: { Fab, FileList },
  computed: {
    ...mapGetters(["files"])
  },
  methods: {
    ...mapActions(["fetchFiles"])
  },
  created() {
    this.fetchFiles();
  },
};
</script>

<style scoped>
</style>