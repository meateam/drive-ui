<template>
  <div>
    <p class="d-subtitle folders-header">{{$t('file.Folders')}}</p>
    <div class="flex">
      <Folder
        @dblclick="onDblClick"
        @contextmenu="onRightClick"
        v-for="folder in typeFolders"
        :key="folder.id"
        :folder="folder"
      />
    </div>
    <p class="d-subtitle">{{$t('file.Files')}}</p>
    <div class="flex">
      <File
        @dblclick="onDblClick"
        @contextmenu="onRightClick"
        v-for="file in typeFiles"
        :key="file.id"
        :file="file"
      />
    </div>
    <FileContextMenu ref="contextmenu" :files="chosenFiles" />
    <Preview ref="preview" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Preview from "@/components/popups/Preview";
import FileContextMenu from "@/components/popups/FileContextMenu";
import Folder from "./type/Folder";
import File from "./type/File";

export default {
  name: "FilesPreview",
  props: ["files"],
  components: { File, Folder, FileContextMenu, Preview },
  computed: {
    ...mapGetters(["folderContentType", "chosenFiles"])
  },
  data() {
    return {
      typeFolders: this.files.filter(
        file => file.type === "application/vnd.drive.folder"
      ),
      typeFiles: this.files.filter(
        file => file.type !== "application/vnd.drive.folder"
      )
    };
  },
  watch: {
    files: function(val) {
      this.typeFolders = val.filter(
        file => file.type === "application/vnd.drive.folder"
      );
      this.typeFiles = val.filter(
        file => file.type !== "application/vnd.drive.folder"
      );
    }
  },
  methods: {
    onDblClick(event, file) {
      event.preventDefault();
      if (file.type === this.folderContentType) {
        this.$router.push({ path: "/folders", query: { id: file.id } });
      } else {
        this.$refs.preview.open(file);
      }
    },
    onRightClick(event, file) {
      event.preventDefault();
      this.$store.commit("onFilesSelect", [file]);
      this.$refs.contextmenu.show(event);
    }
  }
};
</script>

<style scoped>
.folders-header {
  margin-top: 20px;
}
</style>