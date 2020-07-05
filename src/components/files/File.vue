<template>
  <div>
    <div
      id="file"
      :class="{checked: isChecked}"
      class="file-list-structure"
      @dblclick="onDblClick"
      @click.ctrl="checkFile(!isChecked)"
      @contextmenu.prevent="onRightClick"
    >
      <v-checkbox @change="onFileChoose(isChecked)" v-model="isChecked" color="#357e6f"></v-checkbox>
      <div>
        <img v-if="isFolder(file.type)" src="@/assets/icons/folderType.png" />
      </div>
      <p id="file-name" class="ltr">{{file.name}}</p>
      <p>{{file.owner}}</p>
      <p>{{file.updatedAt}}</p>
      <p class="ltr">{{formatBytes(file.size)}}</p>
    </div>
    <Preview ref="preview"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { canPreview } from "@/utils/canPreview";
import fileSize from "filesize";
import Preview from "@/components/popups/Preview";

export default {
  name: "ListFile",
  props: ["file"],
  data() {
    return {
      isChecked: false
    };
  },
  components: { Preview },
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
    isFolder(type) {
      return type === this.folderContentType;
    },
    onRightClick(event) {
      this.$emit("rightclick", event, this.file);
      if (!this.isChecked) this.checkFile(true);
    },
    onFileChoose(isChecked) {
      this.$store.commit("onFileChoose", {
        isChecked,
        file: this.file
      });
    },
    onDblClick(event) {
      event.preventDefault();
      if (this.isFolder(this.file.type)) {
        this.$router.push({ path: "/folders", query: { id: this.file.id } });
      } else if (canPreview(this.file.type)) {
        this.$refs.preview.open(this.file);
      }
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
  white-space: nowrap;
  padding-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.checked {
  background-color: rgb(230, 236, 246);
}
</style>