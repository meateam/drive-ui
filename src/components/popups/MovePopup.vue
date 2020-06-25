<template>
  <v-dialog v-model="dialog" max-width="550" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/movePopup.png" />
        <p class="d-title">{{$t('folder.Move')}}</p>
        <div class="files">
          <p class="ltr space" v-for="file in files" :key="file.id">{{file.name}}</p>
        </div>
      </div>
      <div class="popup-body">
        <div class="flex">
          <div>
            <span @click="onFolderClick(undefined)" class="pointer">{{$t('myDrive.header')}}</span>
            <span class="space">></span>
          </div>
          <div v-for="folder in folderHierarchy" :key="folder.id">
            <span @click="onFolderClick(folder.id)" class="pointer">{{folder.name}}</span>
            <span class="space">></span>
          </div>
        </div>

        <div>
          <Folders :parent="folderID" @change="onFolderChange" />
        </div>
        <v-card-actions class="popup-confirm">
          <Confirm @click="onConfirm" :label="$t('buttons.Confirm')" />
          <Back @click="dialog = false" :label="$t('buttons.Cancel')" />
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import Folders from "../shared/Folders";
import Back from "@/components/buttons/Back";
import Confirm from "../buttons/Confirm";

export default {
  name: "MovePopup",
  components: { Confirm, Folders, Back },
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
        this.folderHierarchy = await this.$store.dispatch(
          "getFolderHierarchy",
          folderID
        );
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
</style>