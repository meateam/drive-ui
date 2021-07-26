<template>
  <v-tooltip top v-if="canEdit()" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.rename.open()"
        v-on="on"
        :icon="icon"
        :class="{ right: !icon }"
        class="auto-margin"
        id="edit-button"
        text
      >
        <img class="fab-icon" src="@/assets/icons/edit.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Edit") }}</p>
      </v-btn>
    </template>
    <NamePopup
      img="green-edit.svg"
      ref="rename"
      :value="nameOnly"
      :type="isFolder() ? 'renameFolder' : 'renameFile'"
      @confirm="onConfirm"
    />
    <span>{{ $t("buttons.Edit") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { writeRole } from "@/utils/roles";
import { isFolder } from "@/utils/isFolder";
import NamePopup from "../popups/BaseNamePopup";

export default {
  name: "EditButton",
  props: ["icon"],
  components: { NamePopup },
  computed: {
    ...mapGetters(["chosenFiles", "currentFolder"]),
    nameOnly() {
      if (!this.isFolder()) {
        const splitedName = this.chosenFiles[0].name.split(".");
        if (splitedName.length > 1) {
          splitedName.pop();
          return splitedName.join(".");
        }
      }
      return this.chosenFiles[0].name;
    },
    extentionOnly() {
      if (!this.isFolder()) {
        const splitedName = this.chosenFiles[0].name.split(".");
        if (splitedName.length > 1) {
          return `.${splitedName.pop()}`;
        }
      }
      return "";
    },
  },
  methods: {
    onConfirm(name) {
      const fullName = `${name}${this.extentionOnly}`;
      this.$store.dispatch("editFile", {
        name: fullName,
        file: this.chosenFiles[0],
      });
      this.$emit("close");
    },
    isFolder() {
      return isFolder(this.chosenFiles[0].type);
    },
    openNameEdit() {
      if (this.canEdit()) this.$refs.rename.open();
    },
    canEdit() {
      return (
        this.chosenFiles.length === 1 &&
        (!this.currentFolder || writeRole(this.currentFolder.role)) &&
        this.chosenFiles.every((file) => writeRole(file.role)) &&
        !this.isFileReadOnly()
      );
    },
    isFileReadOnly() {
      return this.chosenFiles.every(
        (file) => file?.isReadOnly != undefined && file.isReadOnly
      );
    },
  },
  mounted() {
    addEventListener("keydown", this.onF2Click);
  },
};
</script>
