<template>
  <div class="file-list-structure">
    <v-checkbox color="#357e6f"></v-checkbox>
    <p id="file-name">{{file.name}}</p>
    <p>{{file.owner}}</p>
    <p>{{formatedDate(file.updatedAt)}}</p>
    <p id="file-size">{{formatBytes(file.size)}}</p>
  </div>
</template>

<script>
import fileSize from "filesize";

export default {
  name: "ListFile",
  props: ["file"],
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
    }
  }
};
</script>

<style scoped>
#file:hover {
  background-color: rgb(213, 221, 235);
}
#file-name {
  font-family: Rubik;
  font-size: 20px;
  direction: ltr;
}
#file-size {
  direction: ltr;
}
</style>