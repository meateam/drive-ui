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
import PageTemplate from "@/components/BasePageTemplate";
import { mapGetters } from "vuex";
import { isOwner } from "@/utils/isOwner";
import { getNetworkItemByAppId } from "@/utils/networkDest";

export default {
  name: "File",
  components: { PageTemplate },
  data() {
    return {
      breadcrumbs: [],
    };
  },
  watch: {
    currentFolder: function (folder) {
      this.onFolderChange(folder);
    },
  },
  computed: {
    ...mapGetters([
      "files",
      "currentFolder",
      "currentFile",
    ]),
  },
  methods: {
    async onFolderChange(folder) {
      await this.getBreadcrumbs(folder);
      this.$store.dispatch("fetchFile");
    },
    async getBreadcrumbs(folder) {
      if (!folder) return;

      const hierarchy = folder.id
        ? await filesApi.getFolderHierarchy(folder.id)
        : [];
      const getExternalNetworkFirstBreadcrumb = (appID) => {
        const externalNetworkDest = getNetworkItemByAppId(appID);
        return this.$t("pageHeaders.ExternalTransferred", {
          networkName: externalNetworkDest.label,
        });
      };
      const getDriveFirstBreadcrumb = (ownerId) =>
        this.isFileOwner(ownerId)
          ? this.$t("pageHeaders.MyDrive")
          : this.$t("pageHeaders.SharedWithMe");

      const breadcrumbs = [];

      // In case there is an hierarchy, it checks the first folder. Otherwise, it checks about the current file.
      const firstFileOrFolder =
        hierarchy && hierarchy.length > 0 ? hierarchy[0] : this.currentFile;
      const firstBreadcrumbText = firstFileOrFolder.isExternal
        ? getExternalNetworkFirstBreadcrumb(firstFileOrFolder.appID)
        : getDriveFirstBreadcrumb(firstFileOrFolder.ownerId);

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

      if (folder && folder.name) {
        breadcrumbs.push({
          value: folder,
          text: folder.name,
          disabled: false,
        });
      }

      this.breadcrumbs = breadcrumbs;
    },
    onBreadcrumbClick(folder) {
      if (!folder) {
        if (!this.currentFile.isExternal) {
          this.isFileOwner(this.currentFile.ownerId)
            ? this.$router.push("/my-drive")
            : this.$router.push("/shared-with-me");
        } else {
          this.$router.push(`/external-transferred-${this.currentFile.appID}`);
        }
      } else {
        this.$router.push({ path: "/folders", query: { id: folder.id } });
      }
    },
    isFileOwner(ownerId) {
      return isOwner(ownerId);
    },
  },
};
</script>