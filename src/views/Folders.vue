<template>
  <div class="page-container">
    <div class="page-header" id="folders-header" v-if="currentFolder">
      <router-link to="my-drive">
        {{$t('myDrive.header')}}
        <span class="space">></span>
      </router-link>
      <div v-for="folder in currentFolderHierarchy" :key="folder.id">
        <span @click="onFolderClick(folder.id)" class="pointer">{{folder.name}}</span>
        <span class="space">></span>
      </div>
      <span>{{`${currentFolder.name}`}}</span>
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
    ...mapGetters(["files", "currentFolder", "currentFolderHierarchy"])
  },
  methods: {
    onFolderClick(folderID) {
      this.$router.push({ path: "/folders", query: { id: folderID } });
    }
  }
};
</script>

<style scoped>
#folder {
  width: 30px;
  height: 26px;
}
#folders-header {
  font-size: 30px;
}
.space {
  margin: 0 8px;
}
</style>