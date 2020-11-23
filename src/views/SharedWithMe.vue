<template>
  <PageTemplate
    :files="files"
    :serverFilesLength="serverFilesLength"
    :header="$t('pageHeaders.SharedWithMe')"
    @page="onPageChange"
  />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";

export default {
  name: "Shared",
  components: { PageTemplate },
  computed: {
    ...mapGetters(["files", "serverFilesLength"]),
  },
  created() {
    this.$store.dispatch("fetchSharedFiles");
  },
  methods: {
    onPageChange(page) {
      console.log(page);
    },
  },
};
</script>