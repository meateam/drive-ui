<template>
  <Layout>
    <PageTemplate :files="files" :header="$t('pageHeaders.ExternalTransferd')" />
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
import Layout from "@/components/layout/Layout";
import PageTemplate from "@/components/shared/BasePageTemplate";

export default {
  name: "ExternalTransferd",
  components: { PageTemplate, Layout },
  computed: {
    ...mapGetters(["files"])
  },
  created() {
    this.$store.dispatch("fetchExternalTransferdFiles");
  }
};
</script>