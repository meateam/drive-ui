<template>
  <PageTemplate
    :files="files"
    :serverFilesLength="30"
    :sortable="true"
    @page="onPageChange"
    :header="$t('pageHeaders.Search')"
  />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";

export default {
  name: "Search",
  components: { PageTemplate },
  computed: {
    ...mapGetters(["files"]),
  },
  created() {
    this.$store.dispatch("fetchSearchFiles", { query: this.$route.query.q, pageNum: 0 });
  },
  watch: {
    "$route.query.q"() {
      this.$store.dispatch("fetchSearchFiles", { query: this.$route.query.q, pageNum: 0 });
    },
  },
  methods: {
    onPageChange(page) {
      console.log(page);
      this.$store.dispatch("fetchSearchFiles", { query: this.$route.query.q, pageNum: page - 1 });
    },
  },
};
</script>
