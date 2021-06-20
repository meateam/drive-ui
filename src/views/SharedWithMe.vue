<template>
  <PageTemplate
    :files="files"
    :serverFilesLength="serverFilesLength"
    :header="$t('pageHeaders.SharedWithMe')"
    @page="onPageChange"
  />
</template>

<script>
import PageTemplate from "@/components/BasePageTemplate";
import { mapGetters } from "vuex";
import { getPageSize } from "@/utils/getPageSize";

export default {
  name: "Shared",
  components: { PageTemplate },
  computed: {
    ...mapGetters(["files", "serverFilesLength", "fileView", "currentFolder"]),
  },
  watch: {
    fileView: function(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.$store.commit("setFiles", []);
        this.$store.commit("setServerFilesLength", 1);
        this.$store.commit("updatePageNum", 1);
        this.$store.dispatch("fetchSharedFiles", { pageNum: 0, pageAmount: getPageSize(newValue) });
      }
    },
  },
  created() {
    this.$store.dispatch("fetchSharedFiles", { pageNum: 0, pageAmount: getPageSize(this.fileView) });
  },
  methods: {
    onPageChange(page) {
      if (
        this.fileView != 1 ||
        (this.fileView == 1 && getPageSize(this.fileView) * (page - 1) < this.serverFilesLength)
      ) {
        this.$store.dispatch("fetchSearchFiles", {
          query: this.$route.query.q,
          pageNum: page - 1,
          isAppend: this.fileView == 1 ? true : false,
          pageAmount: getPageSize(this.fileView),
        });
      }
    },
  },
};
</script>
