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
    <p>{{formatedDate(file.updatedAt)}}</p>
    <p class="ltr">{{formatBytes(file.size)}}</p>
    <FileInfo ref="fileInfo" :file="file" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fileSize from "filesize";
import FileInfo from "../../../components/shared/popups/FileInfo";

export default {
  name: "ListFile",
  props: ["file"],
  data() {
    return {
      isChecked: false
    };
  },
  components: { FileInfo },
  computed: {
    ...mapGetters(["folderContentType"])
  },
  methods: {
    /**
     * getDate return the formated creation date
     * @param d is the date to format
     */
    formatedDate(d) {
      const date = new Date(d);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate() + 1;
      const hour = date.getHours();
      const minutes = date.getMinutes();

      return `${day}.${month}.${year} ${hour}:${minutes}`;
    },
    /**
     * get the the formated size of the file
     * @param bytes is the bytes to format
     */
    formatBytes(bytes) {
      if (bytes == 0) return "-";
      return fileSize(bytes);
    },
    isFolder(file) {
      return file.type === this.folderContentType;
    },
    onFileChoose() {
      this.$store.commit("onFileChoose", {
        isChecked: this.isChecked,
        fileID: this.file.id
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