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
          :class="{selected: isSelected}"
          @click.exact="onFileClick(item)"
          @click.ctrl.stop="onCtrlCLick(item)"
          @contextmenu.prevent="onRightClick($event, item)"
          @dblclick.prevent="onDblClick($event, item)"
        >
          <td>
            <v-simple-checkbox color="#357e6f" v-ripple :value="isSelected" @input="select($event)"></v-simple-checkbox>
          </td>
          <td id="file-icon">
            <FileTypeIcon :file="item" :size="30"/>
          </td>
          <td id="file-name">{{ item.name }}</td>
          <td>{{ item.owner }}</td>
          <td>{{ formatFileDate(item.updatedAt) }}</td>
          <td id="size">{{ formatFileSize(item.size) }}</td>
        </tr>
      </template>
      <template v-slot:header.data-table-select="{props,on}">
        <v-simple-checkbox color="#357e6f" v-ripple v-bind="props" v-on="on"></v-simple-checkbox>
      </template>
      <template v-slot:no-data>{{$t('NoData')}}</template>
    </v-data-table>
    <v-row justify="center">
      <v-pagination id="pagination" color="#357e6f" v-model="page" :length="pageCount"></v-pagination>
    </v-row>
    <BottomMenu :chosenFiles="chosenFiles" />
    <FileContextMenu ref="contextmenu" :files="chosenFiles" />
    <Preview ref="preview" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatBytes } from "@/utils/formatBytes";
import { formatDate } from "@/utils/formatDate";
import { canPreview } from "@/utils/canPreview";
import { isFolder } from "@/utils/isFolder";
import BottomMenu from "@/components/popups/BottomMenu";
import FileTypeIcon from "@/components/shared/BaseFileTypeIcon";
import FileContextMenu from "@/components/popups/FileContextMenu";
import Preview from "@/components/popups/Preview";

export default {
  name: "FileTable",
  props: ["files"],
  components: { BottomMenu, FileContextMenu, Preview, FileTypeIcon },
  computed: {
    ...mapGetters(["chosenFiles"])
  },
  data() {
    return {
      selected: [],
      page: 1,
      itemsPerPage: 10,
      pageCount: 1,
      headers: [
        { value: "type", sortable: false, align: "center" },
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
  min-height: calc(100vh - 320px);
}
.selected {
  background-color: rgb(231, 237, 248);
}
#folder {
  text-align: center;
}
#size {
  direction: ltr;
  text-align: right;
}
#file-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  direction: ltr;
  max-width: 500px;
}
#file-icon {
  width: 55px;
}
#pagination {
  padding-top: 20px;
}
</style>