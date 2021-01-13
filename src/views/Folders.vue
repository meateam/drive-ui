<template>
  <PageTemplate
    :files="files"
    :upload="true"
    :breadcrumbs="breadcrumbs"
    :sortable="true"
    @breadcrumb="onBreadcrumbClick"
  />
</template>

<script>
import * as filesApi from "@/api/files";
import { mapGetters } from "vuex";
import { ownerRole } from "@/utils/roles";
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
        text: this.isFolderOwner()
          ? this.$t("pageHeaders.MyDrive")
          : this.$t("pageHeaders.SharedWithMe"),
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
        this.isFolderOwner()
          ? this.$router.push("/my-drive")
          : this.$router.push("/shared-with-me");
      } else {
        this.$router.push({ path: "/folders", query: { id: folder.id } });
      }
    },
    isFolderOwner() {
      return ownerRole(this.currentFolder.role);
    },
  },
};
</script>