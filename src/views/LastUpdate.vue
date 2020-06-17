<template>
  <div class="page-container">
    <h1 class="page-header">{{$t('lastUpdate.header')}}</h1>
    <FileList v-bind:files="files" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FileList from "@/components/files/list/FileList";

export default {
  name: "LastUpdate",
  components: { FileList },
  computed: {
    ...mapGetters(["files"])
  },
};
</script>

<style scoped>
</style>