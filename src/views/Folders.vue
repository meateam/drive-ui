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
import { getNetworkItemByAppId } from "@/utils/networkDest";

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

      const hierarchy = await filesApi.getFolderHierarchy(folder.id);

      const getExternalNetworkFirstBreadcrumb = (appID) => {
        const externalNetworkDest = getNetworkItemByAppId(appID);
        return this.$t("pageHeaders.ExternalTransferred", {
          networkName: externalNetworkDest.label,
        });
      };
      const getDriveFirstBreadcrumb = (role) =>
        this.isFolderOwner(role)
          ? this.$t("pageHeaders.MyDrive")
          : this.$t("pageHeaders.SharedWithMe");

      const breadcrumbs = [];

      const firstFolder =
        hierarchy && hierarchy.length > 0 ? hierarchy[0] : this.currentFolder;
      const firstBreadcrumbText = firstFolder.isExternal
        ? getExternalNetworkFirstBreadcrumb(firstFolder.appID)
        : getDriveFirstBreadcrumb(firstFolder.role);

      breadcrumbs.push({
        value: undefined,
        text: firstBreadcrumbText,
        disabled: false,
      });

      hierarchy.forEach((folder) => {
        breadcrumbs.push({
          value: folder,
          text: folder.name,
          disabled: false,
        });
      });

      breadcrumbs.push({
        value: folder,
        text: folder.name,
        disabled: false,
      });

      this.breadcrumbs = breadcrumbs;
    },
    onBreadcrumbClick(folder) {
      if (!folder) {
        this.isFolderOwner(this.currentFolder.role)
          ? this.$router.push("/my-drive")
          : this.$router.push("/shared-with-me");
      } else {
        this.$router.push({ path: "/folders", query: { id: folder.id } });
      }
    },
    isFolderOwner(role) {
      return ownerRole(role);
    },
  },
};
</script>