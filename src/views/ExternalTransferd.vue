<template>
  <PageTemplate :files="files" :header="$t('pageHeaders.ExternalTransferd')" />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";

export default {
  name: "ExternalTransferd",
  components: { PageTemplate },
  computed: {
    ...mapGetters(["files"])
  },
  created() {
    this.$store.dispatch("fetchExternalTransferdFiles");
  }
};
</script>