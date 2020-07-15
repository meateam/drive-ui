<template>
  <Layout>
    <PageTemplate :files="files" :header="$t('pageHeaders.MyDrive')" :upload="true" />
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
import Layout from "@/components/layout/Layout";
import PageTemplate from "@/components/shared/BasePageTemplate";

export default {
  name: "MyDrive",
  components: { PageTemplate, Layout },
  computed: {
    ...mapGetters(["files"])
  },
  created() {
    this.$store.dispatch("fetchFiles");
  }
};
</script>