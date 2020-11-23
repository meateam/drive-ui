<template>
  <PageTemplate
    :files="files"
    :serverFilesLength="serverFilesLength"
    :header="$t('pageHeaders.ExternalTransferd')"
    @page="onPageChange"
  />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";

export default {
  name: "ExternalTransferd",
  components: { PageTemplate },
  computed: {
    ...mapGetters(["files", "serverFilesLength"]),
  },
  created() {
    this.$store.dispatch("fetchExternalTransferdFiles");
  },
  methods: {
    onPageChange(page) {
      console.log(page);
    },
  },
};
</script>