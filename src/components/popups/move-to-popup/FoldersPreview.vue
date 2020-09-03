<template>
  <v-list max-height="255" v-if="folders.length">
    <v-list-item link v-for="folder in folders" :key="folder.id" @dblclick="onChoose(folder)">
      <v-list-item-icon>
         <v-icon color="#fc8946" class="icons">folder</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ folder.name }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import * as filesApi from "@/api/files";

export default {
  name: "FoldersPreview",
  data() {
    return {
      chosenFolder: undefined,
      folders: []
    };
  },
  props: ["parent"],
  watch: {
    parent: function(val) {
      this.fetchFolders(val);
    }
  },
  methods: {
    onChoose(folder) {
      this.$emit("change", folder);
    },
    async fetchFolders(parent) {
      this.folders = await filesApi.getFoldersByFolder(parent);
    }
  },
  created() {
    this.fetchFolders(this.parent);
  }
};
</script>

<style scoped>
.v-list {
  overflow: auto;
  margin: 20px 0;
}
</style>