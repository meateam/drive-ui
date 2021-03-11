<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      :items="items"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :single-select="!isSelectMany"
      :show-select="isSelectMany"
      :server-items-length="itemsLength"
      hide-default-footer
      @page-count="pageCount = $event"
    >
      <template v-slot:item="{ item }">
        <tr
          @click.exact.stop="$emit('fileclick', item.file)"
          @contextmenu.prevent="onRightClick($event, item.file)"
          @dblclick.prevent="onDblClick($event, item.file)"
        >
          <td id="file-icon"><FileTypeIcon :file="item.file" :size="30" /></td>
          <td class="file-name"><BaseTooltip :value="item.fileName" /></td>
          <td>{{ item.classification || "-" }}</td>
          <td>{{ item.file.owner || "???" }}</td>
          <td>
            <v-sheet id="sheet" class="mx-auto" v-if="item.to && item.to.length > 0">
              <v-slide-group show-arrows id="slide">
                <v-slide-item id="slide-item" v-for="(user, index) in item.to" v-bind:key="index">
                  <UserAvatar :key="user.id" :user="user"/></v-slide-item
              ></v-slide-group>
            </v-sheet>
            <h2 v-else>-</h2>
          </td>

          <td class="ltr-td">{{ formatFileDate(item.createdAt) }}</td>
          <td class="ltr-td">
            <BaseStepper v-if="item.status && item.status.length > 0" :items="item.status" />
            <h2 v-else>-</h2>
          </td>
          <td class="ltr-td">{{ getNetworkLabel(item.destination) }}</td>
        </tr>
      </template>

      <template v-slot:[`header.data-table-select`]="{ props, on }">
        <v-simple-checkbox color="#035c64" v-ripple v-bind="props" v-on="on" />
      </template>

      <!-- if there is not data yet -->
      <template v-slot:no-data>{{ $t("NoData") }}</template>
    </v-data-table>

    <!-- pagination pages -->
    <v-row justify="center">
      <v-pagination id="pagination" color="#035c64" v-model="page" :length="pageCount" />
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatDate } from "@/utils/formatDate";
import { pageSizeSmaller } from "@/config";
import FileTypeIcon from "@/components/files/BaseFileTypeIcon";
import BaseStepper from "@/components/stepper/BaseStepper.vue";
import BaseTooltip from "@/components/inputs/BaseTooltip.vue";
import UserAvatar from "@/components/popups/info-popup/UserAvatar.vue";
import { getNetworkItemByDest } from "@/utils/networkDest";

export default {
  name: "StatusTable",
  props: ["items", "itemsLength", "sortable"],
  components: { FileTypeIcon, BaseStepper, BaseTooltip, UserAvatar },
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
      sortBy: "createdAt",
      sortDesc: true,
      isSelectMany: false,
      selected: this.chosenFiles,
      itemsPerPage: pageSizeSmaller,
      pageCount: 1,
      headers: [
        { value: "type", align: "center", sortable: false },
        { text: this.$t("file.Name"), value: "fileName", sortable: this.sortable, width: "300px", fixed: true },
        { text: this.$t("file.TransferClassification"), value: "classification", sortable: this.sortable },
        { text: this.$t("file.Owner"), value: "file.owner", sortable: this.sortable },
        {
          text: this.$t("file.TransferDestUsers"),
          value: "to",
          sortable: this.sortable,
          width: "100px",
          align: "center",
        },
        { text: this.$t("file.TransferCreatedAt"), value: "createdAt", sortable: this.sortable },
        { text: this.$t("file.TransferStatus"), value: "status", sortable: this.sortable },
        { text: this.$t("file.TransferDestination"), value: "destination", sortable: this.sortable },
      ],
    };
  },
  methods: {
    getNetworkLabel(dest) {
      return getNetworkItemByDest(dest).label;
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
    selected: function(files) {
      this.$store.commit("setChosenFiles", files);
    },
    chosenFiles: function(files) {
      this.selected = files;
    },
    pageNum: function(page) {
      this.$emit("page", page);
    },
  },
};
</script>

<style scoped>
@import "../../../styles/data-table.css";
#slide {
  height: 60px;
}
#sheet {
  max-width: 250px;
  background-color: transparent;
}
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
