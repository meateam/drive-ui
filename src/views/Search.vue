<template>
  <PageTemplate
    :files="files"
    :serverFilesLength="serverFilesLength"
    :sortable="true"
    @page="onPageChange"
    :header="$t('pageHeaders.Search')"
  />
</template>

<script>
import { mapGetters } from "vuex";
import { pageSize } from "@/config";
import PageTemplate from "@/components/BasePageTemplate";

export default {
  name: "Search",
  components: { PageTemplate },
  computed: {
    ...mapGetters(["files", "serverFilesLength", "fileView"]),
  },
  created() {
    this.$store.dispatch("fetchSearchFiles", {
      query: this.$route.query.q,
      pageNum: 0,
      pageAmount: this.getPageSize(this.fileView),
    });
  },
  watch: {
    "$route.query.q"() {
      this.$store.dispatch("fetchSearchFiles", {
        query: this.$route.query.q,
        pageNum: 0,
        pageAmount: this.getPageSize(this.fileView),
      });
    },
    fileView: function(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.$store.commit("setFiles", []);
        this.$store.commit("setServerFilesLength", 1);
        this.$store.commit("updatePageNum", 1);
        this.$store.dispatch("fetchSearchFiles", {
          query: this.$route.query.q,
          pageNum: 0,
          pageAmount: this.getPageSize(newValue),
        });
      }
    },
  },
  methods: {
    getPageSize(fileView) {
      return fileView === 0 || fileView === "0" || fileView === "undefined" || fileView === undefined
        ? pageSize
        : pageSize * 2;
    },
    onPageChange(page) {
      if (
        this.fileView != 1 ||
        (this.fileView == 1 && this.getPageSize(this.fileView) * (page - 1) < this.serverFilesLength)
      ) {
        this.$store.dispatch("fetchSearchFiles", {
          query: this.$route.query.q,
          pageNum: page - 1,
          isAppend: this.fileView == 1 ? true : false,
          pageAmount: this.getPageSize(this.fileView),
        });
      }
    },
  },
};
</script>
