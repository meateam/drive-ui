<template>
  <v-treeview :items="items" :load-children="fetchFolders" open-on-click expand-icon>
    <template v-slot:prepend="{ item }">
      <div id="folder" @click="fetchFolders(item)">
        <img class="icons" id="folder-icon" src="@/assets/icons/folder.png" />
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
      active: [],
      folders: []
    };
  },
  methods: {
    async fetchFolders(item) {
      const folders = await this.$store.dispatch("getFilesByFolder", item);
      this.open = item;
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
    },
    selected() {
      if (!this.active.length) return undefined;

      const id = this.active[0];

      return this.users.find(user => user.id === id);
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
}
</style>