<template>
  <PageTemplate
    :files="files"
    :upload="true"
    :breadcrumbs="breadcrumbs"
    @breadcrumb="onBreadcrumbClick"
  />
</template>

<script>
import * as filesApi from "@/api/files";
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";

export default {
  name: "Folder",
  components: { PageTemplate },
  data() {
    return {
      breadcrumbs: [],
    };
  },
  created() {
    this.onFolderChange(this.currentFolder);
  },
  watch: {
    currentFolder: function (folder) {
      this.onFolderChange(folder);
    },
  },
  computed: {
    ...mapGetters(["files", "currentFolder"]),
  },
  methods: {
    async onFolderChange(folder) {
      await this.getBreadcrumbs(folder);
      this.$store.dispatch("fetchFiles");
    },
    async getBreadcrumbs(folder) {
      if (!folder) return;

      const breadcrumbs = [];

      breadcrumbs.push({
        value: undefined,
        text: this.$t("pageHeaders.MyDrive"),
        disabled: false,
      });

      const hierarchy = await filesApi.getFolderHierarchy(folder.id);

      hierarchy.forEach((folder) => {
        breadcrumbs.push({
          value: folder,
          text: folder.name,
          disabled: false,
        });
      });

      breadcrumbs.push({
        text: folder.name,
        disabled: true,
      });

      this.breadcrumbs = breadcrumbs;
    },
    onBreadcrumbClick(folder) {
      if (!folder) {
        this.$router.push("/my-drive");
      } else {
        this.$router.push({ path: "/folders", query: { id: folder.id } });
      }
    },
  },
};
</script>