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
    // ceach close and reload tab
    window.addEventListener("beforeunload", this.close);
  },
  methods: {
    close(e) {
      console.log(this.isUpload);
      if (this.isUpload) {
        e.preventDefault();
        e.returnValue = `Are you sure you want to leave?`;
        return e.returnValue;
      }
    },
  },
};
</script>

<style scoped>
@import "./styles/global.css";
</style>