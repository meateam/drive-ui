<template>
  <div class="page-container">
    <div class="page-header" v-if="currentFolder">
      <router-link to="my-drive">{{$t('myDrive.header')}}</router-link>
      <span class="space-right">></span>
      <div>
        <!-- <img class="space-right" id="folder" src="@/assets/icons/folderType.png" /> -->
      </div>
      <span class="space-right">{{`${currentFolder.name}`}}</span>
    </div>
    <Fab />
    <FileList v-bind:files="files" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Fab from "@/components/buttons/Fab";
import FileList from "@/components/files/list/FileList";

export default {
  name: "Folder",
  components: { Fab, FileList },
  created() {
    document.title = this.currentFolder.name;
  },
  computed: {
    ...mapGetters(["files", "currentFolder"])
  }
};
</script>

<style scoped>
#folder {
  width: 30px;
  height: 26px;
}
</style>