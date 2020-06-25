<template>
  <v-treeview
    :items="items"
    :load-children="fetchFolders"
    open-on-click
    item-key="folder"
  >
    <template v-slot:prepend="{ item }">
      <div id="folder">
        <img class="icons" id="folder-icon" src="@/assets/icons/folderType.png" />
        <v-icon v-if="item.children" :v-text="item.name"></v-icon>
      </div>
    </template>
  </v-treeview>
</template>

<script>
export default {
  name: "FolderTree",
  data() {
    return {
      folders: []
    };
  },
  methods: {
    async fetchFolders(item) {
      this.$emit("change", item.id);
      if (item.children.length) item.children = [];
      const folders = await this.$store.dispatch("getFilesByFolder", item);
      folders.forEach(folder => {folder.children = []});
      item.children.push(...folders);
    }
  },
  computed: {
    items() {
      return [
        {
          name: this.$t("sidenav.Folders"),
          children: []
        }
      ];
    }
  }
};
</script>

<style scoped>
.theme--light.v-treeview {
  color: #c8d9d5 !important;
  font-weight: 700;
}
#folder-icon {
  margin-left: 13px;
}
#folder {
  line-height: 70px;
  height: 70px;
}
</style>