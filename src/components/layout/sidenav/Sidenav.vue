<template>
  <v-navigation-drawer permanent app floating right id="sidenav">
    <v-list nav>
      <v-list-item id="logo-container">
        <v-list-item-content>
          <v-list-item-title>
            <img id="logo" class="auto-margin" src="@/assets/images/logo.svg" />
          </v-list-item-title>
          <v-list-item-title class="sidenav-title" id="version">{{version}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <router-link to="/my-drive" exact-active-class="route-active">
        <v-list-item link id="my-drive-link">
          <v-list-item-icon>
            <img class="icons white-icon" src="@/assets/icons/home.svg" />
            <img class="icons green-icon" src="@/assets/icons/green-home.svg" />
          </v-list-item-icon>
          <v-list-item-title class="sidenav-title">{{ $t("sidenav.MyDrive") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/shared-with-me" exact-active-class="route-active">
        <v-list-item link>
          <v-list-item-icon>
            <img class="white-icon" src="@/assets/icons/share.svg" />
            <img class="green-icon" src="@/assets/icons/green-share.svg" />
          </v-list-item-icon>
          <v-list-item-title class="sidenav-title">{{ $t("sidenav.SharedWithMe") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/last-updated" exact-active-class="route-active">
        <v-list-item link>
          <v-list-item-icon>
            <img class="icons white-icon" src="@/assets/icons/last-update.svg" />
            <img class="icons green-icon" src="@/assets/icons/green-last-update.svg" />
          </v-list-item-icon>
          <v-list-item-title class="sidenav-title">{{ $t("sidenav.LastUpdated") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/external-transferd" exact-active-class="route-active">
        <v-list-item link>
          <v-list-item-icon>
            <img class="icons white-icon" src="@/assets/icons/transfer.svg" />
            <img class="icons green-icon" src="@/assets/icons/green-transfer.svg" />
          </v-list-item-icon>
          <v-list-item-title class="sidenav-title">{{ $t("sidenav.ExternalTransferd") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      <v-list-item link @click="openApprovalService">
        <v-list-item-icon>
          <img class="icons" src="@/assets/icons/pending.svg" />
        </v-list-item-icon>
        <v-list-item-title class="sidenav-title">{{ myExternalSharesName }}</v-list-item-title>
      </v-list-item>

      <!-- <router-link to="/favorites" exact-active-class="route-active">
        <v-list-item link>
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/favorites.svg" />
          </v-list-item-icon>
          <v-list-item-title class="sidenav-title">{{ $t("sidenav.Favorites") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      

      <router-link to="/deleted-files" exact-active-class="route-active">
        <v-list-item link>
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/delete.svg" />
          </v-list-item-icon>
          <v-list-item-title class="sidenav-title">{{ $t("sidenav.Deleted") }}</v-list-item-title>
        </v-list-item>
      </router-link>-->

      <div>
        <v-list-item>
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/storage.svg" />
          </v-list-item-icon>
          <v-list-item-title class="sidenav-title">{{ $t("sidenav.Quota.Quota") }}</v-list-item-title>
        </v-list-item>
        <Quota :quota="quota" />
      </div>
    </v-list>
    <img id="yesodot" class="icons" src="@/assets/images/yesodot.svg" />
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Quota from "./quota/Quota";

export default {
  name: "Sidenav",
  components: { Quota },
  computed: {
    ...mapGetters([
      "version",
      "quota",
      "approvalServiceUrl",
      "myExternalSharesName",
    ]),
  },
  methods: {
    ...mapActions(["getQuota"]),
    openApprovalService() {
      window.open(this.approvalServiceUrl);
    },
  },
  created() {
    this.getQuota();
  },
};
</script>

<style scoped>
#sidenav {
  background-image: linear-gradient(to bottom, #347a99, #2f7e71);
  display: block;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  padding: 0 20px;
}
.v-list {
  padding: 0;
  min-height: calc(100% - 80px);
}
.v-list-item {
  height: 70px;
  font-weight: 700;
}
#logo-container {
  height: 86px;
  margin: 0 35px;
}
#logo {
  padding-bottom: 5px;
}
#yesodot {
  display: block;
  width: 70px;
  height: 70px;
  margin: 0 30px;
  margin: auto;
}
.v-list-item__icon {
  margin: auto;
}
.icons {
  width: 22px;
  height: 22px;
}
#version {
  text-align: center;
}
.sidenav-title {
  color: #fff9e5;
}
.white-icon {
  display: block;
}
.green-icon {
  display: none;
}
.route-active {
  background-color: #f0f3f8;
}
.route-active .white-icon {
  display: none;
}
.route-active .green-icon {
  display: block;
}
.route-active .sidenav-title {
  color: #035c64;
}
</style>