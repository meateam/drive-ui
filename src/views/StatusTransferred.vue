<template>
  <PageTemplateStatus
    :items="transfers"
    :itemsLength="transfersLength"
    :sortable="false"
    :header="$t('pageHeaders.StatusTransferred')"
    @page="onPageChange"
  />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplateStatus from "@/components/BasePageTemplateStatus";

export default {
  name: "StatusTransferred",
  components: { PageTemplateStatus },
  computed: {
    ...mapGetters(["transfers", "transfersLength"]),
  },
  created() {
    this.$store.dispatch("fetchTransferredStatus", { pageNum: 0 });
  },
  methods: {
    onPageChange(page) {
      this.$store.dispatch("fetchTransferredStatus", { pageNum: page - 1 });
    },
  },
};
</script>
