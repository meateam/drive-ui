<template>
  <v-navigation-drawer permanent app floating right id="sidenav">
    <v-list nav>
      <v-list-item id="logo-container">
        <v-list-item-content>
          <v-list-item-title class="title">
            <img id="logo" class="auto-margin" src="@/assets/images/logo.png" />
          </v-list-item-title>
          <v-list-item-title id="version">{{version}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <router-link to="/my-drive">
        <v-list-item link id="my-drive-link">
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/home.svg" />
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidenav.MyDrive") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      <v-divider></v-divider>

      <router-link to="/shared-with-me">
        <v-list-item link>
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/share.svg" />
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidenav.SharedWithMe") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      <v-divider></v-divider>

      <router-link to="/last-update">
        <v-list-item link>
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/last-update.svg" />
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidenav.LastUpdate") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      <v-divider></v-divider>

      <v-list-item link @click="openApprovalService">
        <v-list-item-icon>
          <img class="icons" src="@/assets/icons/pending.svg" />
        </v-list-item-icon>
        <v-list-item-title>{{ myExternalSharesName }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <!-- <router-link to="/favorites">
        <v-list-item link>
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/favorites.svg" />
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidenav.Favorites") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      <v-divider></v-divider>

      <router-link to="/deleted-files">
        <v-list-item link>
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/delete.svg" />
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidenav.Deleted") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      <v-divider></v-divider>-->

      <div>
        <v-list-item>
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/storage.svg" />
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidenav.Quota.Quota") }}</v-list-item-title>
        </v-list-item>
        <Quota :quota="quota" />
      </div>

      <v-divider></v-divider>
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
      "myExternalSharesName"
    ])
  },
  methods: {
    ...mapActions(["getQuota"]),
    openApprovalService() {
      window.open(this.approvalServiceUrl);
    }
  },
  created() {
    this.getQuota();
  }
};
</script>

<style scoped>
#sidenav {
  background-image: linear-gradient(to bottom, #357e6f, #4d804d);
  display: block;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: #c8d9d5 !important;
  padding: 0 20px;
}
.theme--light.v-divider {
  border-color: #255f53 !important;
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
  width: 18px;
}
#version {
  text-align: center;
}
</style>