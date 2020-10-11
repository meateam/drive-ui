<template>
  <v-dialog v-model="dialog" max-width="550" class="popup">
    <v-card>
      <div class="popup-header">
        <img
          class="popup-icon auto-margin"
          src="@/assets/icons/green-move-to.svg"
        />
        <p class="d-title">{{ $t("folder.Move") }}</p>
        <div class="files">
          <p class="ltr space" v-for="file in files" :key="file.id">
            {{ file.name }}
          </p>
        </div>
      </div>
      <div class="popup-body">
        <Breadcrumbs :items="folderHierarchy" @click="onFolderChange" />

        <List :items="currentChildren" icon="folder" @change="onFolderChange" />
        
        <v-card-actions class="popup-confirm">
          <SubmitButton @click="onConfirm" :label="$t('buttons.Confirm')" />
          <TextButton @click="dialog = false" :label="$t('buttons.Cancel')" />
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import * as filesApi from "@/api/files";
import List from "@/components/shared/BaseList";
import TextButton from "@/components/buttons/BaseTextButton";
import Breadcrumbs from "@/components/shared/BaseBreadcrumbs";
import SubmitButton from "@/components/buttons/BaseSubmitButton";

export default {
  name: "MoveToPopup",
  components: { SubmitButton, List, TextButton, Breadcrumbs },
  data() {
    return {
      dialog: false,
      folderHierarchy: undefined,
      currentFolder: undefined,
      currentChildren: undefined,
    };
  },
  props: ["files"],
  methods: {
    async open() {
      await this.fetchHierachy(this.currentFolder);
      await this.fetchFolders(this.currentFolder);

      this.dialog = true;
    },
    async fetchFolders(parent) {
      this.currentChildren = await filesApi.getFoldersByFolder(
        parent ? parent.id : undefined
      );
    },
    async fetchHierachy(folder) {
      const breadcrumbs = [];

      breadcrumbs.push({
        value: undefined,
        text: this.$t("pageHeaders.MyDrive"),
        disabled: !folder,
      });

      if (folder) {
        const hierarchy = await filesApi.getFolderHierarchy(folder.id);

        hierarchy.forEach((folder) => {
          breadcrumbs.push({
            value: folder,
            text: folder.name,
            disabled: false,
          });
        });

        breadcrumbs.push({
          text: folder.name,
          disabled: true,
        });
      }

      this.folderHierarchy = breadcrumbs;
    },
    async onFolderChange(folder) {
      if (this.isFolderInFolder(folder)) return;

      await this.fetchHierachy(folder);
      await this.fetchFolders(folder);
      this.currentFolder = folder;
    },
    isFolderInFolder(folder) {
      if (!folder) return false;

      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].id === folder.id) return true;
      }

      return false;
    },
    onConfirm() {
      this.$emit(
        "confirm",
        this.currentFolder ? this.currentFolder.id : undefined
      );
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.files {
  display: flex;
  color: #035c64;
  font-size: 16px;
  justify-content: center;
}
.space {
  margin: 0 8px;
}
.popup-body {
  height: 430px;
  position: relative;
}
.popup-confirm {
  position: absolute;
  bottom: 20px;
  left: 30px;
}
</style>