<template>
  <Layout>
    <PageTemplate :files="files" :header="$t('pageHeaders.SharedWithMe')" />
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/shared/BasePageTemplate";
import Layout from "@/components/layout/Layout";

export default {
  name: "Shared",
  components: { PageTemplate, Layout },
  computed: {
    ...mapGetters(["files"])
  },
  created() {
    this.$store.dispatch("fetchSharedFiles");
  }
};
</script>