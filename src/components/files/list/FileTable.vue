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
          :class="{'selected-list-item': isSelected}"
          @click.exact="onFileClick(item)"
          @click.ctrl.stop="onCtrlCLick(item)"
          @contextmenu.prevent="onRightClick($event, item)"
          @dblclick.prevent="onDblClick($event, item)"
        >
          <td>
            <v-simple-checkbox color="#035c64" v-ripple :value="isSelected" @input="select($event)"></v-simple-checkbox>
          </td>
          <td id="file-icon">
            <FileTypeIcon :file="item" :size="30" />
          </td>
          <td class="file-name">{{ item.name }}</td>
          <td>{{ item.owner }}</td>
          <td>{{ formatFileDate(item.updatedAt) }}</td>
          <td class="file-size">{{ formatFileSize(item.size) }}</td>
        </tr>
      </template>
      <template v-slot:header.data-table-select="{props,on}">
        <v-simple-checkbox color="#035c64" v-ripple v-bind="props" v-on="on"></v-simple-checkbox>
      </template>
      <template v-slot:no-data>{{$t('NoData')}}</template>
    </v-data-table>
    <v-row justify="center">
      <v-pagination id="pagination" color="#035c64" v-model="page" :length="pageCount"></v-pagination>
    </v-row>
    <BottomMenu :chosenFiles="chosenFiles" />
    <FileContextMenu ref="contextmenu" :files="chosenFiles" />
    <Preview ref="preview" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fileTypes } from "@/config";
import { formatBytes } from "@/utils/formatBytes";
import { formatDate } from "@/utils/formatDate";
import { isFolder } from "@/utils/isFolder";
import * as filesApi from "@/api/files";

import BottomMenu from "@/components/popups/menus/BottomMenu";
import FileTypeIcon from "@/components/files/BaseFileTypeIcon";
import FileContextMenu from "@/components/popups/menus/FileContextMenu";
import Preview from "@/components/popups/Preview";

export default {
  name: "FileTable",
  props: ["files"],
  components: { BottomMenu, FileContextMenu, Preview, FileTypeIcon },
  computed: {
    ...mapGetters(["chosenFiles"]),
  },
  data() {
    return {
      selected: [],
      page: 1,
      itemsPerPage: 7,
      pageCount: 1,
      headers: [
        { value: "type", align: "center", sortable: false },
        { text: this.$t("file.Name"), value: "name" },
        { text: this.$t("file.Owner"), value: "owner" },
        { text: this.$t("file.LastUpdate"), value: "updatedAt" },
        { text: this.$t("file.Size"), value: "size" },
      ],
      items: this.files,
    };
  },
  methods: {
    formatFileSize(size) {
      return formatBytes(size);
    },
    calculateItemsPerPage() {
      const pageHeight = window.innerHeight;
      const layoutHeight = 380;
      const itemHeight = 70;
      const items = Math.floor((pageHeight - layoutHeight) / itemHeight);

      this.itemsPerPage = items < 7 ? 7 : items;
    },
    formatFileDate(date) {
      return formatDate(date);
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
      if (isFolder(file.type)) {
        this.$router.push({ path: "/folders", query: { id: file.id } });
      } else if (this.canEditOnline(file)) {
        filesApi.editOnline(this.chosenFiles[0].id);
      } else {
        this.$refs.preview.open(file);
      }
    },
    onCtrlCLick(file) {
      if (!this.selected.includes(file)) this.selected.push(file);
      else this.selected = this.selected.filter((item) => item !== file);
    },
    onFileClick(file) {
      this.selected = [file];
    },
    canEditOnline(file) {
      return fileTypes.office.includes(file.type);
    },
  },
  watch: {
    selected: function (files) {
      this.$store.commit("onFilesSelect", files);
    },
    files: function (files) {
      this.items = files;
    },
    chosenFiles: function (files) {
      this.selected = files;
    },
  },
  created() {
    this.calculateItemsPerPage();

    window.addEventListener("keydown", (event) => {
      if (event.key === "a" && event.ctrlKey) {
        event.preventDefault();
        this.selected = this.items;
      }
    });

    window.addEventListener("resize", this.calculateItemsPerPage);
  },
};
</script>

<style scoped>
@import "../../../styles/data-table.css";

#folder {
  text-align: center;
}
#file-icon {
  width: 55px;
}
#pagination {
  padding-top: 20px;
}
</style>