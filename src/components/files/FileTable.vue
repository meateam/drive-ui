<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      show-select
      hide-default-footer
      @contextmenu:row="onRightClick"
      @dblclick:row="onDblClick"
      @page-count="pageCount = $event"
    >
      <template v-slot:item="{item,isSelected,select}">
        <tr
          @click.exact="onFileClick(item)"
          @click.ctrl="onCtrlClick(item)"
          @contextmenu.prevent="onRightClick($event, item)"
          @dblclick.prevent="onDblClick($event, item)"
        >
          <td>
            <v-simple-checkbox color="#357e6f" v-ripple :value="isSelected" @input="select($event)"></v-simple-checkbox>
          </td>
          <td>
            <img src="@/assets/icons/folderType.png" v-if="isFolder(item.type)" />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.owner }}</td>
          <td>{{ item.updatedAt }}</td>
          <td>{{ formatFileSize(item.size) }}</td>
        </tr>
      </template>
      <template v-slot:header.data-table-select="{props,on}">
        <v-simple-checkbox color="#357e6f" v-ripple v-bind="props" v-on="on"></v-simple-checkbox>
      </template>
      <template v-slot:no-data>{{$t('NoData')}}</template>
    </v-data-table>
    <v-row justify="center">
      <v-pagination color="#357e6f" v-model="page" :length="pageCount"></v-pagination>
    </v-row>
    <BottomMenu :chosenFiles="chosenFiles" />
    <FileContextMenu ref="contextmenu" :files="chosenFiles" />
    <Preview ref="preview" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatBytes } from "@/utils/formatBytes";
import { canPreview } from "@/utils/canPreview";
import BottomMenu from "@/components/popups/BottomMenu";
import FileContextMenu from "@/components/popups/FileContextMenu";
import Preview from "@/components/popups/Preview";

export default {
  name: "FileTable",
  props: ["files"],
  components: { BottomMenu, FileContextMenu, Preview },
  computed: {
    ...mapGetters(["chosenFiles", "folderContentType"])
  },
  data() {
    return {
      selected: [],
      page: 1,
      itemsPerPage: Math.floor((window.innerHeight - 350) / 70),
      pageCount: 1,
      headers: [
        { value: "type" },
        { text: this.$t("file.Name"), value: "name" },
        { text: this.$t("file.Owner"), value: "owner" },
        { text: this.$t("file.LastUpdate"), value: "updatedAt" },
        { text: this.$t("file.Size"), value: "size" }
      ],
      items: this.files
    };
  },
  methods: {
    formatFileSize(size) {
      return formatBytes(size);
    },
    isFolder(type) {
      return type === this.folderContentType;
    },
    onRightClick(event, file) {
      event.preventDefault();
      if (!this.selected.includes(file)) {
        this.selected = [file];
      }
      this.$refs.contextmenu.show(event);
    },
    onDblClick(event, file) {
      event.preventDefault();
      if (this.isFolder(file.type)) {
        this.$router.push({ path: "/folders", query: { id: file.id } });
      } else if (canPreview(file.type)) {
        this.$refs.preview.open(file);
      }
    },
    onCtrlCLick(file) {
      if (!this.selected.includes(file)) this.selected.push(file);
      else this.selected = this.selected.filter(item => item !== file);
    },
    onFileClick(file) {
      this.selected = [file];
    }
  },
  watch: {
    selected: function(files) {
      this.$store.commit("onFilesSelect", files);
    },
    files: function(files) {
      this.items = files;
    },
    chosenFiles: function(files) {
      this.selected = files;
    }
  },
  created() {
    window.addEventListener("keydown", event => {
      if (event.key === "a" && event.ctrlKey) {
        event.preventDefault();
        this.selected = this.items;
      }
    });
  }
};
</script>

<style scoped>
.v-data-table {
  background-color: transparent !important;
  min-height: calc(100vh - 300px);
}
</style>