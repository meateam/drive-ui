<template>
  <div
    id="file"
    class="file-list-structure"
    @dblclick="onFileClick"
    @contextmenu.prevent="$emit('rightclick', $event)"
  >
    <v-checkbox @change="onFileChoose(isChecked)" v-model="isChecked" color="#357e6f"></v-checkbox>
    <div>
      <img v-if="isFolder(file)" src="@/assets/icons/folderType.png" />
    </div>
    <p id="file-name" class="ltr">{{file.name}}</p>
    <p>{{file.owner}}</p>
    <p>{{file.updatedAt}}</p>
    <p class="ltr">{{formatBytes(file.size)}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fileSize from "filesize";

export default {
  name: "ListFile",
  props: ["file"],
  data() {
    return {
      isChecked: false
    };
  },
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
    isFolder(file) {
      return file.type === this.folderContentType;
    },
    onFileChoose(isChecked) {
      this.$store.commit("onFileChoose", {
        isChecked,
        file: this.file
      });
    },
    onFileClick(event) {
      event.preventDefault();
      if (this.isFolder(this.file))
        this.$router.push({ path: "/folders", query: { id: this.file.id } });
    },
    checkFile(event) {
      this.isChecked = event;
      this.onFileChoose(this.isChecked);
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