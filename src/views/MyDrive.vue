<template>
  <div class="page-container">
    <h1 class="page-header">{{$t('myDrive.header')}}</h1>
    <Fab />
    <FileList v-bind:files="files" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Fab from "@/components/buttons/Fab";
import FileList from "@/components/files/list/FileList";

export default {
  name: "MyDrive",
  components: { Fab, FileList },
  computed: {
    ...mapGetters(["files"])
  },
};
</script>

<style scoped>
</style>