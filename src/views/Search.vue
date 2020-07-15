<template>
  <Layout>
    <PageTemplate :files="files" :header="$t('pageHeaders.Search')" />
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/shared/BasePageTemplate";
import Layout from "@/components/layout/Layout";

export default {
  name: "Search",
  components: { PageTemplate, Layout },
  computed: {
    ...mapGetters(["files"])
  },
  created() {
    this.$store.dispatch("fetchSearchFiles", this.$route.query.q);
  }
};
</script>