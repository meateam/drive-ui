<template>
  <PageTemplate
    :files="files"
    :sortable="true"
    :header="$t('pageHeaders.Favorites')"
    :upload="true"
  />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";

export default {
  name: "Favorites",
  components: { PageTemplate },
  computed: {
    ...mapGetters(["files"]),
  },
  created() {
    this.$store.dispatch("fetchFavFiles");
  },
};
</script>