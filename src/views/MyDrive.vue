<template>
  <div>
    <PageTemplate :files="files" :header="$t('myDrive.header')" />
    <FabButton />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/shared/BasePageTemplate";
import FabButton from "@/components/buttons/FabButton";

export default {
  name: "MyDrive",
  components: { FabButton, PageTemplate },
  computed: {
    ...mapGetters(["files"])
  },
  created() {
    this.$store.dispatch("fetchFiles");
  }
};
</script>