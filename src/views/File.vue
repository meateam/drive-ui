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

export default {
  name: "File",
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
    ...mapGetters([
      "files",
      "currentFolder",
      "currentFile",
      "externalNetworkDests",
    ]),
  },
  methods: {
    async onFolderChange(folder) {
      await this.getBreadcrumbs(folder);
      this.$store.dispatch("fetchFile");
    },
    async getBreadcrumbs(folder) {
      if (!folder) return;

      const breadcrumbs = [];

      let firstBreadcrumbText;
      if (this.currentFile.appID === "drive") {
        firstBreadcrumbText = this.isFileOwner()
          ? this.$t("pageHeaders.MyDrive")
          : this.$t("pageHeaders.SharedWithMe");
      } else {
        const externalNetworkDest = this.externalNetworkDests.find(
          (externalNetworkDest) =>
            this.currentFile.appID === externalNetworkDest.appID
        );
        firstBreadcrumbText = this.$t("pageHeaders.ExternalTransferred", {
          networkName: externalNetworkDest.label,
        });
      }

      breadcrumbs.push({
        value: undefined,
        text: firstBreadcrumbText,
        disabled: false,
      });

      if (folder && folder.id) {
        const hierarchy = await filesApi.getFolderHierarchy(folder.id);

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
      }

      this.breadcrumbs = breadcrumbs;
    },
    onBreadcrumbClick(folder) {
      if (!folder) {
        if (this.currentFile.appID === "drive") {
          this.isFileOwner()
            ? this.$router.push("/my-drive")
            : this.$router.push("/shared-with-me");
        } else {
          this.$router.push(`/external-transferred-${this.currentFile.appID}`);
        }
      } else {
        this.$router.push({ path: "/folders", query: { id: folder.id } });
      }
    },
    isFileOwner() {
      return isOwner(this.currentFile.ownerId);
    },
  },
};
</script>