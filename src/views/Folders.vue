<template>
  <div class="page-container">
    <div id="page-header">
      <div id="page-name" v-if="currentFolder">
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
      <FileViewButton />
    </div>
    <FabButton />
    <FileView v-if="files" :files="files" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FileViewButton from "@/components/buttons/FileViewButton";
import FileView from "@/components/files/FileView";
import FabButton from "@/components/buttons/FabButton";

export default {
  name: "Folder",
  components: { FabButton, FileView, FileViewButton },
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
.space {
  margin: 0 8px;
}
#page-header {
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #357e6f;
}
#page-name {
  font-size: 30px;
  color: #2c3448;
  font-family: Rubik-light;
  font-weight: 400;
  display: flex;
  text-align: right;
}
</style>