<template>
  <PageTemplate :files="files" :upload="true" :folder="true" @breadcrumb="onBreadcrumbClick" />
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";

export default {
  name: "Folder",
  components: { PageTemplate },
  created() {
    document.title = this.currentFolder.name;
    this.$store.dispatch("fetchFiles");
  },
  watch: {
    currentFolder: function () {
      this.$store.dispatch("fetchFiles");
    },
  },
  computed: {
    ...mapGetters(["files", "currentFolder"]),
  },
  methods: {
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

<style scoped>
#folder {
  width: 30px;
  height: 26px;
}
.space {
  margin: 0 8px;
}
#page-header {
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #035c64;
}
#page-name {
  font-size: 30px;
  color: #2c3448;
  font-family: Assistant-light;
  font-weight: 400;
  display: flex;
  text-align: right;
}
</style>