<template>
  <PageTemplate
    :files="files"
    :serverFilesLength="serverFilesLength"
    :sortable="false"
    :header="$t('pageHeaders.StatusTransferd')"
    @page="onPageChange"
  />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";

export default {
  name: "StatusTransferd",
  components: { PageTemplate },
  data() {
    return {};
  },
  props: ["appID"],
  computed: {
    ...mapGetters(["files", "serverFilesLength", "externalNetworkDests"]),
  },
  created() {
    this.$store.dispatch("fetchExternalTransferdFiles", { pageNum: 0, appId: this.appID });
  },
  methods: {
    onPageChange(page) {
      this.$store.dispatch("fetchExternalTransferdFiles", { pageNum: page - 1, appId: this.appID });
    },
  },
};
</script>
