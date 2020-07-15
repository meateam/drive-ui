<template>
  <Layout>
    <PageTemplate :files="files" :header="$t('pageHeaders.LastUpdated')" />
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
import Layout from "@/components/layout/Layout";
import PageTemplate from "@/components/shared/BasePageTemplate";

export default {
  name: "LastUpdated",
  components: { PageTemplate, Layout },
  computed: {
    ...mapGetters(["files"])
  },
  created() {
    this.$store.dispatch("fetchLastUpdatedFiles");
  }
};
</script>

<style scoped>
</style>