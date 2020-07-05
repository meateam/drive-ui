<template>
  <div class="page-container">
    <h1 class="page-header">{{$t('myDrive.header')}}</h1>
    <FabButton />
    <FileTable v-if="files" :files="files" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FabButton from "@/components/buttons/FabButton";
import FileTable from "@/components/files/FileTable";

export default {
  name: "MyDrive",
  components: { FabButton, FileTable },
  computed: {
    ...mapGetters(["files"])
  }
};
</script>

<style scoped>
</style>