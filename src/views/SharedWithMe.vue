<template>
  <PageTemplate :files="files" :header="$t('shared.header')" />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/shared/BasePageTemplate";

export default {
  name: "Shared",
  components: { PageTemplate },
  computed: {
    ...mapGetters(["files"])
  },
  created() {
    this.$store.dispatch("fetchSharedFiles");
  }
};
</script>