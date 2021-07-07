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
import PageTemplate from "@/components/BasePageTemplate";
import { mapGetters } from "vuex";
import { getPageSize } from "@/utils/getPageSize";

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
      pageAmount: getPageSize(this.fileView),
    });
  },
  watch: {
    "$route.query.q"() {
      this.$store.dispatch("fetchSearchFiles", {
        query: this.$route.query.q,
        pageNum: 0,
        pageAmount: getPageSize(this.fileView),
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
          pageAmount: getPageSize(newValue),
        });
      }
    },
  },
  methods: {
    onPageChange(page) {
      if (
        this.fileView != 1 ||
        (this.fileView === 1 && getPageSize(this.fileView) * (page - 1) < this.serverFilesLength)
      ) {
        this.$store.dispatch("fetchSearchFiles", {
          query: this.$route.query.q,
          pageNum: page - 1,
          isAppend: this.fileView === 1,
          pageAmount: getPageSize(this.fileView),
        });
      }
    },
  },
};
</script>
