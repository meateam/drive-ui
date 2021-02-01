<template>
  <PageTemplate
    :files="sortFiles(files)"
    :sortable="true"
    :header="$t('pageHeaders.MyDrive')"
    :upload="true"
  />
</template>

<script>
import { mapGetters } from "vuex";
import { sortFilesBySize } from "@/utils/sortFiles";
import PageTemplate from "@/components/BasePageTemplate";

export default {
  name: "MyDrive",
  components: { PageTemplate },
  computed: {
    ...mapGetters(["files"]),
  },
  created() {
    this.$store.dispatch("fetchFiles");
  },
  methods: {
    sortFiles(files) {
      return sortFilesBySize(files);
    },
  },
};
</script>