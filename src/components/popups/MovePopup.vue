<template>
  <v-dialog v-model="dialog" max-width="550" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/green-move.svg" />
        <p class="d-title">{{$t('folder.Move')}}</p>
        <div class="files">
          <p class="ltr space" v-for="file in files" :key="file.id">{{file.name}}</p>
        </div>
      </div>
      <div class="popup-body">
        <BaseBreadcrumbs v-if="folderID" :folders="folderHierarchy" @click="onFolderClick" />

        <div>
          <FoldersPreview :parent="folderID" @change="onFolderChange" />
        </div>
        <v-card-actions class="popup-confirm">
          <SubmitButton @click="onConfirm" :label="$t('buttons.Confirm')" />
          <BaseTextButton @click="dialog = false" :label="$t('buttons.Cancel')" />
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import * as filesApi from "@/api/files";
import FoldersPreview from "@/components/shared/FoldersPreview";
import BaseTextButton from "@/components/buttons/BaseTextButton";
import BaseBreadcrumbs from "@/components/shared/BaseBreadcrumbs";
import SubmitButton from "@/components/buttons/BaseSubmitButton";

export default {
  name: "MovePopup",
  components: { SubmitButton, FoldersPreview, BaseTextButton, BaseBreadcrumbs },
  data() {
    return {
      dialog: false,
      folderID: undefined,
      folderHierarchy: []
    };
  },
  props: ["files"],
  methods: {
    open() {
      this.dialog = true;
    },
    onFolderChange(folderID) {
      this.fetchHierachy(folderID);
      this.folderID = folderID;
    },
    async fetchHierachy(folderID) {
      if (!folderID) {
        this.folderHierarchy = undefined;
      } else {
        this.folderHierarchy = await filesApi.getFolderHierarchy(folderID);
      }
    },
    onFolderClick(folderID) {
      this.fetchHierachy(folderID);
      this.folderID = folderID;
    },
    onConfirm() {
      this.$emit("confirm", this.folderID);
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.files {
  display: flex;
  color: #357e6f;
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