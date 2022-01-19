<template>
  <v-dialog v-model="dialog" max-width="550" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/green-move-to.svg" />
        <p class="d-title">{{ $t("folder.Copy") }}</p>
        <div class="files">
          <p class="ltr file" v-for="file in files" :key="file.id">
            {{ file.name }}
          </p>
        </div>
      </div>
        <div id="selection-effect" :class="{ 'copyButton': copyButton === 'SharedWithMe' }"></div>
        <v-btn :ripple="false" class="button" @click="openMyDrive()" text small ><p>{{ $t('sidenav.MyDrive') }}</p></v-btn>
        <v-btn v-if="!isSharedFile()" :ripple="false" class="button" @click="openSharedFolders()" text small><p>{{ $t('sidenav.SharedWithMe') }}</p></v-btn>
      <div class="popup-body">

        <Breadcrumbs :items="folderHierarchy" @click="onFolderChange" />
        <List :items="currentChildren" icon="folder" @change="onFolderChange" :disabledChecker="isFolderDestDisabled" />

        <v-card-actions class="popup-confirm">
          <SubmitButton @click="onConfirm" :label="$t('buttons.Confirm')" :disabled="submitButtonDisabled"/>
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

const COPY_TO_BUTTON = {
  MY_DRIVE: 'MyDrive',
  SHARED_WITH_ME: 'SharedWithMe'
};

export default {
  name: "CopyFilePopup",
  components: { SubmitButton, List, TextButton, Breadcrumbs },
  computed: {
    ...mapGetters(["currentFolder", "chosenFiles"]),
  },
  data() {
    return {
      dialog: false,
      folderHierarchy: undefined,
      currentChildren: undefined,
      folderDest: undefined,
      copyButton: COPY_TO_BUTTON.MY_DRIVE,
      submitButtonDisabled: false,
    };
  },
  props: ["files"],
  methods: {
    isSharedFile() {
      const firstFile =
        this.chosenFiles && this.chosenFiles.length > 0
          ? this.chosenFiles[0]
          : this.currentFolder;
      return firstFile && firstFile.shared;
    },
    async open(fetchFunction, buttonIndex) {
      this.copyButton = buttonIndex;
      const isSharedWithMe = this.copyButton === COPY_TO_BUTTON.SHARED_WITH_ME;
      const isSharedFolder = this.currentFolder && this.currentFolder.shared;
      const folder = isSharedWithMe || isSharedFolder ? undefined : this.currentFolder;
      await Promise.all([this.fetchHierachy(folder), fetchFunction(folder)]);
      this.dialog = true;  
    },
    async openMyDrive() {
      this.open(this.fetchFolders, COPY_TO_BUTTON.MY_DRIVE);
    },
    async openSharedFolders() {
      this.open(this.fetchSharedFolders, COPY_TO_BUTTON.SHARED_WITH_ME);
    },
    async fetchFolders(parent) {
        this.submitButtonDisabled = false;
        this.currentChildren = await filesApi.getFoldersByFolder(parent ? parent.id : undefined);
    },
    async fetchSharedFolders(parent) {
      if (parent === undefined) {
        this.submitButtonDisabled = true;
        this.currentChildren = await filesApi.fetchSharedFolders(parent ? parent.id : undefined);
      } else {
        this.submitButtonDisabled = false;
        this.currentChildren = await filesApi.getFoldersByFolder(parent ? parent.id : undefined);
      }
    },
    async fetchHierachy(folder) {
      const breadcrumbs = [];
      const getDriveFirstBreadcrumb = (role) =>
        this.isFolderOwner(role)
          ? [this.$t("pageHeaders.MyDrive"), false]
          : [this.$t("pageHeaders.SharedWithMe"), false];

      if (!folder) {
        switch (this.copyButton) {
          case COPY_TO_BUTTON.MY_DRIVE:
            breadcrumbs.push({
            value: undefined,
            text: this.$t("pageHeaders.MyDrive"),
            disabled: !folder,
            });
            break;
          case COPY_TO_BUTTON.SHARED_WITH_ME:
            breadcrumbs.push({
            value: undefined,
            text: this.$t("pageHeaders.SharedWithMe"),
            disabled: !folder,
            });
            break;
        }
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
      let fetchPromise;
      switch (this.copyButton) {
        case COPY_TO_BUTTON.MY_DRIVE:
          fetchPromise = this.fetchFolders(folder);
          break;
        case COPY_TO_BUTTON.SHARED_WITH_ME:
          fetchPromise = this.fetchSharedFolders(folder);
          break;
      }

      await Promise.all([this.fetchHierachy(folder), fetchPromise]);
   
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

#selection-effect {
  background-color: #f0f4f7;
  width: 85px;
  height: 30px;
  position: absolute;
  
  transition: ease-in-out .3s;
  right: 0;
}

#selection-effect.copyButton {
  right: 85px;
}

.button::before {
  background-color: transparent !important;
}

</style>
