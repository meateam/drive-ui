<template>
  <div class="page-container">
    <h1 class="page-header">{{$t('myDrive.header')}}</h1>
    <FabButton />
    <FileList v-bind:files="files" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FabButton from "@/components/buttons/FabButton";
import FileList from "@/components/files/FileList";

export default {
  name: "MyDrive",
  components: { FabButton, FileList },
  computed: {
    ...mapGetters(["files"])
  }
};
</script>

<style scoped>
</style>