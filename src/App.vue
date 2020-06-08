<template>
  <v-app>
    <Header />
    <Sidenav />
    <router-view></router-view>
  </v-app>
</template>

<script>
import Header from "./components/layout/Header/Header";
import Sidenav from "@/components/layout/Sidenav/Sidenav";

export default {
  name: "App",

  components: {
    Header,
    Sidenav
  }
};
</script>

<style scoped>
@import "./styles/global.css";
</style>