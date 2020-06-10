<template>
  <v-app>
    <Header />
    <Sidenav />
    <v-container id="page">
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidenav from "@/components/layout/sidenav/Sidenav";

export default {
  name: "App",
  components: {
    Header,
    Sidenav
  },
};
</script>

<style scoped>
@import "./styles/global.css";
#page {
  margin-right: 256px;
  width: calc(100vw - 256px);
}
</style>