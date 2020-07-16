<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import Layout from "@/components/layout/Layout";

export default {
  name: "App",
  computed: {
    layout() {
      return this.$route.meta.layout ? Layout : "div";
    }
  }
};
</script>

<style scoped>
@import "./styles/global.css";
</style>