<template>
  <PageTemplate :files="files" :header="$t('pageHeaders.LastUpdated')" />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";

export default {
  name: "LastUpdated",
  components: { PageTemplate },
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