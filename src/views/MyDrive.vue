<template>
  <PageTemplate :files="files" :header="$t('pageHeaders.MyDrive')" :upload="true" />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";

export default {
  name: "MyDrive",
  components: { PageTemplate },
  computed: {
    ...mapGetters(["files"])
  },
  created() {
    this.$store.dispatch("fetchFiles");
  }
};
</script>