<template>
  <PageTemplate :files="files" :header="$t('pageHeaders.SharedWithMe')" />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";

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