<template>
  <PageTemplate
    :files="files"
    :serverFilesLength="serverFilesLength"
    :sortable="false"
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
    this.$store.dispatch("fetchSharedFiles", 0);
  },
  methods: {
    onPageChange(page) {
      this.$store.dispatch("fetchSharedFiles", page - 1);
    },
  },
};
</script>