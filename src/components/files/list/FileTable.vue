<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="files"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :server-items-length="serverFilesLength"
      show-select
      hide-default-footer
      @page-count="pageCount = $event"
    >
      <template v-slot:item="{ item, isSelected, select }">
        <tr
          :class="{ 'selected-list-item': isSelected }"
          @click.exact.stop="$emit('fileclick', item)"
          @click.ctrl.stop="$emit('ctrlclick', item)"
          @contextmenu.prevent="onRightClick($event, item)"
          @dblclick.prevent="onDblClick($event, item)"
        >
          <td>
            <v-simple-checkbox
              color="#035c64"
              v-ripple
              :value="isSelected"
              @input="select($event)"
            ></v-simple-checkbox>
          </td>
          <td id="file-icon">
            <FileTypeIcon :file="item" :size="30" />
          </td>

          <td class="file-name">{{ item.name }}</td>

          <td>{{ item.owner || "???" }}</td>
          <td class="ltr-td">{{ formatFileDate(item.updatedAt) }}</td>
          <td class="ltr-td">{{ formatFileSize(item.size) }}</td>
        </tr>
      </template>
      <template v-slot:[`header.data-table-select`]="{ props, on }">
        <v-simple-checkbox
          color="#035c64"
          v-ripple
          v-bind="props"
          v-on="on"
        ></v-simple-checkbox>
      </template>
      <template v-slot:no-data>{{ $t("NoData") }}</template>
    </v-data-table>

    <v-row justify="center">
      <v-pagination
        id="pagination"
        color="#035c64"
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatBytes } from "@/utils/formatBytes";
import { formatDate } from "@/utils/formatDate";
import { pageSize } from "@/config";
import FileTypeIcon from "@/components/files/BaseFileTypeIcon";

export default {
  name: "FileTable",
  props: ["files", "serverFilesLength", "sortable"],
  components: { FileTypeIcon },
  computed: {
    ...mapGetters(["chosenFiles", "pageNum"]),
    page: {
      get() {
        return this.pageNum;
      },
      set(value) {
        this.$store.commit("updatePageNum", value);
      },
    },
  },
  data() {
    return {
      selected: this.chosenFiles,
      itemsPerPage: pageSize,
      pageCount: 1,
      headers: [
        { value: "type", align: "center", sortable: false },
        { text: this.$t("file.Name"), value: "name", sortable: this.sortable },
        { text: this.$t("file.Owner"), value: "owner", sortable: this.sortable },
        { text: this.$t("file.LastUpdate"), value: "updatedAt", sortable: this.sortable },
        { text: this.$t("file.Size"), value: "size", sortable: this.sortable },
      ],
    };
  },
  methods: {
    formatFileSize(size) {
      return formatBytes(size);
    },
    formatFileDate(date) {
      return formatDate(date);
    },
    onRightClick(event, file) {
      this.$emit("contextmenu", { event, file });
    },
    onDblClick(event, file) {
      this.$emit("dblclick", { event, file });
    },
    onCtrlCLick(file) {
      if (!this.selected.includes(file)) this.selected.push(file);
      else this.selected = this.selected.filter((item) => item !== file);
    },
    onFileClick(file) {
      this.selected = [file];
    },
  },
  watch: {
    selected: function (files) {
      this.$store.commit("setChosenFiles", files);
    },
    chosenFiles: function (files) {
      this.selected = files;
    },
    pageNum: function (page) {
      this.$emit('page', page)
    }
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