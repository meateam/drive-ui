<template>
  <div class="file-list-structure">
    <v-checkbox color="#357e6f"></v-checkbox>
    <div>
      <img id="folder" v-if="isFolder(file)" src="@/assets/icons/folderType.png" />
    </div>
    <p id="file-name" class="ltr">{{file.name}}</p>
    <p>{{file.owner}}</p>
    <p>{{formatedDate(file.updatedAt)}}</p>
    <p class="ltr">{{formatBytes(file.size)}}</p>
  </div>
</template>

<script>
import fileSize from "filesize";
import { mapGetters } from "vuex";

export default {
  name: "ListFile",
  props: ["file"],
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
    }
  }
};
</script>

<style scoped>
.file-list-structure:hover {
  background-color: rgb(213, 221, 235);
}
#file-name {
  font-family: Rubik;
  font-size: 20px;
}
</style>