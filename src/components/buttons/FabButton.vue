<template>
  <v-speed-dial
    id="fab"
    v-model="fab"
    direction="top"
    transition="scale-transition"
    v-if="canUpload()"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" fab color="#2f7e71">
        <v-icon color="white" v-if="fab">close</v-icon>
        <v-icon color="white" v-else>add</v-icon>
      </v-btn>
      <Upload ref="upload" />
    </template>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn @click.stop="$refs.newFolder.open()" v-on="on" fab big color="#035c64">
          <NamePopup
            img="green-create-folder.svg"
            ref="newFolder"
            type="folder"
            @confirm="onFolderConfirm"
          />
          <img class="icon" src="@/assets/icons/create-folder.svg" />
        </v-btn>
      </template>
      <span>{{ $t("buttons.NewFolder") }}</span>
    </v-tooltip>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" fab color="#035c64" @click="$refs.upload.open()">
          <img class="icon" src="@/assets/icons/upload.svg" />
        </v-btn>
      </template>
      <span>{{ $t("buttons.UploadFile") }}</span>
    </v-tooltip>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" fab color="#035c64" @click.stop="$refs.newFile.open()">
          <CreateFilePopup
            ref="newFile"
            @confirm="onFileConfirm"
          />
          <img class="icon" src="@/assets/icons/create-file.svg" />
        </v-btn>
      </template>
      <span>{{ $t("buttons.CreateFile") }}</span>
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
import { mapGetters } from "vuex";
import * as filesApi from "@/api/files";
import { writeRole } from "@/utils/roles";
import Upload from "./Upload";
import NamePopup from "../popups/BaseNamePopup";
import CreateFilePopup from "../popups/CreateFilePopup";

export default {
  name: "FabButton",
  data() {
    return {
      fab: false,
    };
  },
  components: { Upload, NamePopup, CreateFilePopup },
  computed: {
    ...mapGetters(["currentFolder"]),
  },
  methods: {
    onFolderConfirm(name) {
      this.$store.dispatch("uploadFolder", name);
    },
    onFileConfirm(name, type) {
      filesApi.createNewFile({ name, type });
    },
    canUpload() {
      return !this.currentFolder || writeRole(this.currentFolder.role);
    },
  },
  created() {
    window.addEventListener("keydown", (event) => {
      // ctrl o shortcut to upload file
      if (
        event.keyCode === 79 &&
        event.ctrlKey &&
        document.getElementById("upload-input")
      ) {
        event.preventDefault();
        document.getElementById("upload-input").click();
      }
    });
  },
};
</script>

<style scoped>
#fab {
  position: fixed;
  direction: ltr;
  bottom: 50px;
  left: 50px;
}
.icon {
  width: 28px;
  font-size: 50px;
}
</style>