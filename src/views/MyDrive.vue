<template>
  <div class="page-container">
    <DragNDrop />
    <h1 class="page-header">{{$t('myDrive.header')}}</h1>
    <Fab />
    <FileList v-bind:files="files" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Fab from "@/components/buttons/Fab";
import DragNDrop from "@/components/shared/DragNDrop";
import FileList from "@/components/files/list/FileList";

export default {
  name: "MyDrive",
  components: { Fab, FileList, DragNDrop },
  computed: {
    ...mapGetters(["files"])
  }
};
</script>

<style scoped>
</style>