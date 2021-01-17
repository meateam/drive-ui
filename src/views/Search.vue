<template>
  <PageTemplate
    :files="files"
    :sortable="true"
    :header="$t('pageHeaders.Search')"
  />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";

export default {
  name: "Search",
  components: { PageTemplate },
  computed: {
    ...mapGetters(["files"]),
  },
  created() {
    this.$store.dispatch("fetchSearchFiles", this.$route.query.q);
  },
};
</script>