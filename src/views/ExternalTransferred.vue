<template>
  <PageTemplate
    :files="files"
    :serverFilesLength="serverFilesLength"
    :sortable="false"
    :header="$t('pageHeaders.ExternalTransferred', { networkName: headerNetwork })"
    @page="onPageChange"
  />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";
import { getNetworkItemByAppId } from "@/utils/networkDest";

export default {
  name: "ExternalTransferred",
  components: { PageTemplate },
  data() {
    return {
      currentNetworkDest: undefined,
      headerNetwork: this.$t("pageHeaders.ExternalTransferDefault"),
    };
  },
  props: ["appID", "external"],
  computed: {
    ...mapGetters(["files", "serverFilesLength"]),
  },
  watch: {
    appID(newAppId) {
      this.currentNetworkDest = getNetworkItemByAppId(newAppId);
      this.headerNetwork = this.currentNetworkDest.label;
      this.$store.dispatch("fetchExternalTransferredFiles", {
        pageNum: 0,
        appId: newAppId,
        dest: this.currentNetworkDest.value,
        external: this.external, 
      });
    },
  },
  created() {
    this.currentNetworkDest = getNetworkItemByAppId(this.appID);
    this.headerNetwork = this.currentNetworkDest.label;

    this.$store.dispatch("fetchExternalTransferredFiles", {
      pageNum: 0,
      appId: this.appID,
      dest: this.currentNetworkDest.value,
      external: this.external, 
    });
  },
  methods: {
    onPageChange(page) {
      this.$store.dispatch("fetchExternalTransferredFiles", {
        pageNum: page - 1,
        appId: this.appID,
        dest: this.currentNetworkDest.value,
        external: this.external, 
      });
    },
  },
};
</script>
