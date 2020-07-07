<template>
  <div class="page-container">
    <h1 class="page-header">{{$t('lastUpdate.header')}}</h1>
    <FileTable v-if="files" v-bind:files="files" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FileTable from "@/components/files/list/FileTable";

export default {
  name: "LastUpdate",
  components: { FileTable },
  computed: {
    ...mapGetters(["files"])
  },
};
</script>

<style scoped>
</style>