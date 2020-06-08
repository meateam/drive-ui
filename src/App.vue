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
import { mapActions } from "vuex";
import Header from "./components/layout/Header/Header";
import Sidenav from "@/components/layout/Sidenav/Sidenav";

export default {
  name: "App",
  components: {
    Header,
    Sidenav
  },
  methods: {
    ...mapActions(["fetchConfig"])
  },
  created() {
    this.fetchConfig();
  }
};
</script>

<style scoped>
@import "./styles/global.css";
#page {
  margin-right: 256px;
  width: calc(100vw - 256px);
}
</style>