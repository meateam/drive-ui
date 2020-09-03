<template>
  <v-dialog v-model="dialog" max-width="550" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/green-move-to.svg" />
        <p class="d-title">{{$t('folder.Move')}}</p>
        <div class="files">
          <p class="ltr space" v-for="file in files" :key="file.id">{{file.name}}</p>
        </div>
      </div>
      <div class="popup-body">
        <Breadcrumbs
          :folders="folderHierarchy"
          @click="onFolderChange"
          :currentFolder="currentFolder"
        />

        <div>
          <FoldersPreview
            :parent="currentFolder?currentFolder.id:undefined"
            @change="onFolderChange"
          />
        </div>
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
import FoldersPreview from "./FoldersPreview";
import TextButton from "@/components/buttons/BaseTextButton";
import Breadcrumbs from "@/components/shared/BaseBreadcrumbs";
import SubmitButton from "@/components/buttons/BaseSubmitButton";

export default {
  name: "MoveToPopup",
  components: { SubmitButton, FoldersPreview, TextButton, Breadcrumbs },
  data() {
    return {
      dialog: false,
      folderHierarchy: undefined,
      currentFolder: undefined
    };
  },
  props: ["files"],
  methods: {
    open() {
      this.dialog = true;
    },
    async fetchHierachy(folderID) {
      if (!folderID) {
        this.folderHierarchy = undefined;
      } else {
        this.folderHierarchy = await filesApi.getFolderHierarchy(folderID);
      }
    },
    async onFolderChange(folder) {
      this.fetchHierachy(folder ? folder.id : undefined);
      this.currentFolder = folder;
    },
    onConfirm() {
      this.$emit(
        "confirm",
        this.currentFolder ? this.currentFolder.id : undefined
      );
      this.dialog = false;
    }
  }
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