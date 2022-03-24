<template>
  <v-dialog v-model="dialog" max-width="550" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/green-move-to.svg" />
        <p class="d-title">{{ $t("folder.UploadShortcut") }}</p>
        <div class="files">
          <p class="ltr file" v-for="file in files" :key="file.id">
            {{ file.name }}
          </p>
        </div>
      </div>
      <div class="popup-body">
        <Breadcrumbs :items="folderHierarchy" @click="onFolderChange" />
        <List :items="currentChildren" icon="folder" @change="onFolderChange" :disabledChecker="isFolderDestDisabled" />
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
import { writeRole, ownerRole } from "@/utils/roles";
import { mapGetters } from "vuex";
export default {
  name: "CreateShortcutPopup",
  components: { SubmitButton, List, TextButton, Breadcrumbs },
  computed: {
    ...mapGetters(["currentFolder"]),
  },
  data() {
    return {
      dialog: false,
      folderHierarchy: undefined,
      currentChildren: undefined,
      folderDest: undefined,
    };
  },
  props: ["files"],
  methods: {
    async open() {
      await Promise.all([this.fetchHierachy(this.currentFolder), this.fetchFolders(this.currentFolder)]);
      this.dialog = true;
    },
    async fetchFolders(parent) {
      this.currentChildren = await filesApi.getFoldersByFolder(parent ? parent.id : undefined);
    },
    async fetchHierachy(folder) {
      const breadcrumbs = [];
      const getDriveFirstBreadcrumb = (role) =>
        this.isFolderOwner(role)
          ? [this.$t("pageHeaders.MyDrive"), false]
          : [this.$t("pageHeaders.SharedWithMe"), true];

      if (!folder) {
        breadcrumbs.push({
          value: undefined,
          text: this.$t("pageHeaders.MyDrive"),
          disabled: !folder,
        });
      } else {
        const hierarchy = await filesApi.getFolderHierarchy(folder.id);
        const firstFolder = hierarchy && hierarchy.length > 0 ? hierarchy[0] : folder;
        const [firstBreadCrumb, firstIsDisabled] = getDriveFirstBreadcrumb(firstFolder.role);

        breadcrumbs.push({
          value: undefined,
          text: firstBreadCrumb,
          disabled: firstIsDisabled || !folder,
        });
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
      this.folderDest = folder;
    },
    isFolderInFolder(folder) {
      if (!folder) return false;
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].id === folder.id) return true;
      }
      return false;
    },
    isFolderDestDisabled(folder) {
      return !writeRole(folder.role) || this.isFolderInFolder(folder);
    },
    onConfirm() {
      this.$emit("confirm", this.folderDest ? this.folderDest.id : undefined);
      this.dialog = false;
    },
    isFolderOwner(role) {
      return ownerRole(role);
    },
  },
};
</script>

<style scoped>
.files {
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
}
.file {
  margin: 0 8px;
  text-align: center;
  max-width: 550px;
  color: #035c64;
  font-size: 16px;
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
