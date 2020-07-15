<template>
  <PageTemplate :files="files" :header="$t('pageHeaders.LastUpdate')" />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/shared/BasePageTemplate";

export default {
  name: "LastUpdate",
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