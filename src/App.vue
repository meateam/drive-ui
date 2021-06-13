<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import Layout from "@/components/layout/Layout";
import { UploadGet } from "@/store/modules/upload";
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    layout() {
      return this.$route.meta.layout ? Layout : "div";
    },
    ...mapGetters({
      isUpload: UploadGet.isUpload,
    }),
  },
  created() {
    // catch close and reload tab
    window.addEventListener("beforeunload", this.close);
  },
  destroyed() {
    // catch close and reload tab
    window.removeEventListener("beforeunload", this.close);
  },
  methods: {
    close(e) {
      if (this.isUpload) {
        e.preventDefault();
        e.returnValue = this.$t("popup.are_you_sure_you_want_to_leave");
        return e.returnValue;
      }
    },
  },
};
</script>

<style scoped>
@import "./styles/global.css";
</style>