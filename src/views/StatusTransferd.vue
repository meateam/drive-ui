<template>
  <PageTemplateStatus
    :items="transfers"
    :itemsLength="transfersLength"
    :sortable="false"
    :header="$t('pageHeaders.StatusTransferd')"
    @page="onPageChange"
  />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplateStatus from "@/components/BasePageTemplateStatus";

export default {
  name: "StatusTransferd",
  components: { PageTemplateStatus },
  computed: {
    ...mapGetters(["transfers", "transfersLength"]),
  },
  created() {
    this.$store.dispatch("fetchTransferdStatus", { pageNum: 0 });
  },
  methods: {
    onPageChange(page) {
      this.$store.dispatch("fetchTransferdStatus", { pageNum: page - 1 });
    },
  },
};
</script>
