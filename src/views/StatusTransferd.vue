<template>
  <PageTemplateStatus
    :items="items"
    :itemsLength="itemsLength"
    :sortable="true"
    :header="$t('pageHeaders.StatusTransferd')"
  />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplateStatus from "@/components/BasePageTemplateStatus";

export default {
  name: "StatusTransferd",
  components: { PageTemplateStatus },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["items", "itemsLength"]),
  },
  created() {
    this.$store.dispatch("fetchTransferdStatus");
  },
};
</script>
