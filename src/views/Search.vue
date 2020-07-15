<template>
  <div>
    <PageTemplate :files="files" :header="$t('pageHeaders.Search')" />
    <FabButton />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/shared/BasePageTemplate";
import FabButton from "@/components/buttons/FabButton";

export default {
  name: "Search",
  components: { FabButton, PageTemplate },
  computed: {
    ...mapGetters(["files"])
  },
  created() {
    this.$store.dispatch("fetchSearchFiles", this.$route.query.q);
  }
};
</script>