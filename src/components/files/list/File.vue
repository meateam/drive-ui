<template>
  <div
    id="file"
    class="file-list-structure"
    @dblclick="onFileClick"
    @contextmenu.prevent="$refs.fileInfo.open()"
  >
    <v-checkbox @change="onFileChoose" v-model="isChecked" color="#357e6f"></v-checkbox>
    <div>
      <img v-if="isFolder(file)" src="@/assets/icons/folderType.png" />
    </div>
    <p id="file-name" class="ltr">{{file.name}}</p>
    <p>{{file.owner}}</p>
    <p>{{file.updatedAt}}</p>
    <p class="ltr">{{formatBytes(file.size)}}</p>
    <Info ref="fileInfo" :file="file" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fileSize from "filesize";
import Info from "@/components/popups/Info";

export default {
  name: "ListFile",
  props: ["file"],
  data() {
    return {
      isChecked: false
    };
  },
  components: { Info },
  computed: {
    ...mapGetters(["folderContentType"])
  },
  methods: {
    /**
     * get the the formated size of the file
     * @param bytes is the bytes to format
     */
    formatBytes(bytes) {
      if (bytes == 0) return "-";
      return fileSize(bytes);
    },
    formatFile(file) {
      file.size = this.formatBytes(file.size);
      file.createdAt = this.formatDate(file.createdAt);
      file.updatedAt = this.formatDate(file.updatedAt);
    },
    isFolder(file) {
      return file.type === this.folderContentType;
    },
    onFileChoose() {
      this.$store.commit("onFileChoose", {
        isChecked: this.isChecked,
        file: this.file
      });
    },
    onFileClick() {
      if (this.isFolder(this.file))
        this.$router.push({ path: "/folders", query: { id: this.file.id } });
    }
  }
};
</script>

<style scoped>
#file {
  cursor: pointer;
}
#file:hover {
  background-color: rgb(213, 221, 235);
}
#file-name {
  font-family: Rubik;
  font-size: 20px;
}
</style>