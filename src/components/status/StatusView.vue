<template>
  <div>
    <StatusTable
      :items="items"
      :itemsLength="itemsLength"
      :sortable="sortable"
      @page="$emit('page', $event)"
      @contextmenu="onRightClick"
      @dblclick="onDblClick"
      @ctrlclick="onCtrlCLick"
      @fileclick="onFileClick"
      @statusclick="onStatusClick"
      @destUsersClick="onDestUsersClick"
    />
    <FileContextMenu ref="contextmenu" :files="chosenFiles" />
    <BottomMenu :chosenFiles="chosenFiles" />
    <Preview ref="preview" />
    <AlertPopup
      ref="convert"
      img="greenConvertFile.svg"
      @confirm="openEditOnline"
      @cancel="openPreview"
      :text="convertMessage(chosenFiles[0])"
      :button="$t('buttons.ConvertNow')"
    />
    <AlertPopup ref="deletedPopup" cancelButton="true" img="deleted.svg" :text="$t('preview.Deleted')" />
    <StatusInfoPopup ref="statusPopup" />
    <UsersPopup ref="destUsersPopup" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fileTypes } from "@/config";
import { convertMessageType } from "@/utils/convertMessage";
import { isFolder } from "@/utils/isFolder";
import * as filesApi from "@/api/files";

import StatusTable from "@/components/status/list/StatusTable";
import AlertPopup from "@/components/popups/BaseAlertPopup";
import StatusInfoPopup from "@/components/popups/status-popup/StatusInfoPopup";
import UsersPopup from "@/components/popups/users-popup/UsersPopup";
import BottomMenu from "@/components/popups/menus/BottomMenu";
import FileContextMenu from "@/components/popups/menus/FileContextMenu";
import Preview from "@/components/popups/Preview";

export default {
  name: "StatusView",
  components: {
    StatusTable,
    Preview,
    FileContextMenu,
    BottomMenu,
    AlertPopup,
    StatusInfoPopup,
    UsersPopup,
  },
  props: ["items", "itemsLength", "sortable"],
  computed: {
    ...mapGetters(["fileView", "chosenFiles"]),
  },
  created() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "a" && event.ctrlKey) {
        event.preventDefault();
        this.$store.commit("setChosenFiles", this.items);
      }
    });
  },
  methods: {
    isOldOfficeType(file) {
      return fileTypes.oldOffice.includes(file.type);
    },
    isFileDeleted(file) {
      return file?.isDeleted != undefined && file.isDeleted;
    },
    convertMessage(file) {
      return file ? this.$t(`file.${convertMessageType(file.type)}`) : "";
    },
    openEditOnline(file) {
      filesApi.editOnline(file.id);
    },
    openPreview(file) {
      this.$refs.preview.open(file);
    },
    onStatusClick(status) {
      this.$refs.statusPopup.open(status);
    },
    onDestUsersClick(users) {
      this.$refs.destUsersPopup.open(users);
    },
    openFailed() {
      this.$refs.deletedPopup.open();
    },
    onRightClick({ event, file }) {
      event.preventDefault();
      if (!this.chosenFiles.includes(file)) {
        this.$store.commit("setChosenFiles", [file]);
      }
      this.$refs.contextmenu.show(event);
    },
    onDblClick({ event, file }) {
      event.preventDefault();

      if (this.isFileDeleted(file)) {
        this.openFailed(file);
      } else if (isFolder(file.type)) {
        this.$router.push({ path: "/folders", query: { id: file.id } });
      } else if (this.isOldOfficeType(file)) {
        this.$refs.convert.open(file);
      } else {
        this.openPreview(file);
      }
    },
    onCtrlCLick(file) {
      if (this.chosenFiles.includes(file)) {
        this.$store.commit("removeSelectedFile", file);
      } else {
        this.$store.commit("addSelectedFile", file);
      }
    },
    onFileClick(file) {
      this.$store.commit("setChosenFiles", [file]);
    },
  },
};
</script>
