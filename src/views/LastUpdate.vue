<template>
  <PageTemplate :files="files" :header="$t('lastUpdate.header')" />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/shared/BasePageTemplate";

export default {
  name: "LastUpdate",
  components: { PageTemplate },
  computed: {
    ...mapGetters(["files"])
  }
};
</script>

<style scoped>
</style>