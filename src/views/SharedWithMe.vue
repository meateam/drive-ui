<template>
  <PageTemplate
    :files="files"
    :serverFilesLength="serverFilesLength"
    :sortable="false"
    :header="$t('pageHeaders.SharedWithMe')"
    @page="onPageChange"
  />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";

export default {
  name: "Shared",
  components: { PageTemplate },
  computed: {
    ...mapGetters(["files", "serverFilesLength", "fileView", "currentFolder"]),
  },
  created() {
    this.$store.dispatch("fetchSharedFiles", { pageNum: 0 });
    if (this.fileView == 1) this.$store.dispatch("fetchSharedFolders", this.currentFolder);
  },
  watch: {
    fileView: function() {
      if (this.fileView == 1) this.$store.dispatch("fetchSharedFolders", this.currentFolder);
    },
  },
  methods: {
    onPageChange(page) {
      if (this.fileView == 0) {
        this.$store.dispatch("fetchSharedFiles", { pageNum: page - 1 });
      } else {
        this.$store.dispatch("fetchSharedFiles", { pageNum: page - 1, isAppend: true });
        this.$store.dispatch("fetchSharedFolders", this.currentFolder);
      }
    },
  },
};
</script>
