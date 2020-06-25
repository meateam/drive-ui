<template>
  <v-list>
    <v-list-item link v-for="folder in folders" :key="folder.id" @dblclick="onChoose(folder)">
      <v-list-item-icon>
        <img class="icons" src="@/assets/icons/folderType.png" />
      </v-list-item-icon>
      <v-list-item-title>{{ folder.name }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "Folders",
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
      this.$emit("change", folder.id);
    },
    async fetchFolders(parent) {
      this.folders = await this.$store.dispatch("getFilesByFolder", parent);
    }
  },
  created() {
    this.fetchFolders(this.parent);
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