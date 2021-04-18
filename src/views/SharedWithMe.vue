<template>
  <PageTemplate
    :files="files"
    :serverFilesLength="serverFilesLength"
    :header="$t('pageHeaders.SharedWithMe')"
    @page="onPageChange"
  />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";
import { pageSize } from "@/config";

export default {
  name: "Shared",
  components: { PageTemplate },
  computed: {
    ...mapGetters(["files", "serverFilesLength", "fileView", "currentFolder"]),
  },
  watch: {
    fileView: function(newValue, oldValue) {
      if (oldValue != newValue) {
        this.$store.commit("setFiles", []);
        this.$store.commit("setServerFilesLength", 0);

        this.$store.commit("updatePageNum", 0);
        this.$store.dispatch("fetchSharedFiles", { pageNum: 0, pageAmount: this.getPageSize(newValue) });
      }
    },
  },
  created() {
    this.$store.dispatch("fetchSharedFiles", { pageNum: 0, pageAmount: this.getPageSize(this.fileView) });
  },
  methods: {
    getPageSize(fileView) {
      return fileView == 0 ? pageSize : pageSize * 2;
    },
    onPageChange(page) {
      if (this.fileView == 0) {
        this.$store.dispatch("fetchSharedFiles", {
          pageNum: page - 1,
          pageAmount: this.getPageSize(this.fileView),
        });
      } else {
        if (pageSize * page - 1 < this.serverFilesLength) {
          this.$store.dispatch("fetchSharedFiles", {
            pageNum: page - 1,
            isAppend: true,
            pageAmount: this.getPageSize(this.fileView),
          });
        }
      }
    },
  },
};
</script>
