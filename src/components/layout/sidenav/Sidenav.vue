<template>
  <v-navigation-drawer permanent app floating right id="sidenav">
    <v-list nav>
      <v-list-item id="logo-container">
        <v-list-item-content>
          <v-list-item-title>
            <img id="logo" class="auto-margin" src="@/assets/images/logo.svg" />
          </v-list-item-title>
          <v-list-item-title class="sidenav-title" id="version">{{ version }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <div v-for="item in menuItems" v-bind:key="item.path">
        <router-link :to="item.path" exact-active-class="route-active">
          <v-list-item link :id="item.id">
            <v-list-item-icon>
              <img class="icons white-icon" :src="require(`@/assets/icons/${item.icons.white}.svg`)" />
              <img class="icons green-icon" :src="require(`@/assets/icons/${item.icons.green}.svg`)" />
            </v-list-item-icon>
            <v-list-item-title class="sidenav-title">{{ $t(item.title) }}</v-list-item-title>
          </v-list-item>
        </router-link>
      </div>

      <v-list-group class="sidenav-submenu-title ">
        <template v-slot:activator>
          <v-list-item-icon>
            <img class="icons" :src="require(`@/assets/icons/transfer.svg`)" />
          </v-list-item-icon>
          <v-list-item-title class="sidenav-title">{{ $t("sidenav.ExternalTransferOutgoing") }}</v-list-item-title>
        </template>

        <div v-if="externalNetworkDests">
          <v-list-item
            v-for="externalNetworkDest in externalNetworkDests"
            v-bind:key="externalNetworkDest.value"
            link
            @click="openApprovalService(externalNetworkDest.value)"
            class="sidenav-subitem"
          >
            <v-list-item-title class="sidenav-title"
              >{{ $t("sidenav.ExternalTransferOutgoingName", { networkName: externalNetworkDest.label }) }}
            </v-list-item-title>
          </v-list-item>
        </div>

        <router-link to="/statusTransferd" exact-active-class="route-active" class="sidenav-subitem">
          <v-list-item link>
            <v-list-item-title class="sidenav-title">{{
              $t("sidenav.ExternalTransferOutgoingStatus")
            }}</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-group>

      <v-list-group class="sidenav-submenu-title ">
        <template v-slot:activator>
          <v-list-item-icon>
            <img class="icons" :src="require(`@/assets/icons/transfer.svg`)" />
          </v-list-item-icon>
          <v-list-item-title class="sidenav-title">{{ $t("sidenav.ExternalTransferIncoming") }}</v-list-item-title>
        </template>

        <div v-if="externalNetworkDests">
          <router-link
            to="/external-transferd"
            v-for="externalNetworkDest in externalNetworkDests"
            v-bind:key="externalNetworkDest.value"
            exact-active-class="route-active"
            class="sidenav-subitem"
          >
            <v-list-item link class="sidenav-subitem">
              <v-list-item-title class="sidenav-title"
                >{{ $t("sidenav.ExternalTransferIncomingName", { networkName: externalNetworkDest.label }) }}
              </v-list-item-title>
            </v-list-item>
          </router-link>
        </div>
      </v-list-group>

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
import * as usersApi from "@/api/users";

export default {
  name: "Sidenav",
  components: { Quota },
  data: () => ({
    menuItems: [
      {
        path: "/my-drive",
        id: "my-drive-link",
        icons: {
          white: "home",
          green: "green-home",
        },
        title: "sidenav.MyDrive",
      },
      {
        path: "/shared-with-me",
        icons: {
          white: "share",
          green: "green-share",
        },
        title: "sidenav.SharedWithMe",
      },
      {
        path: "/last-updated",
        icons: {
          white: "last-update",
          green: "green-last-update",
        },
        title: "sidenav.LastUpdated",
      },

      // {
      //   path: '/favorites',
      //   icons: {
      //     white: 'favorites',
      //     green: 'green-favorites',
      //   },
      //   title: 'sidenav.Favorites',
      // },
      //  {
      //   path: '/deleted-files',
      //   icons: {
      //     white: 'delete',
      //     green: 'green-delete',
      //   },
      //   title: 'sidenav.Deleted',
      // },
    ],
  }),
  computed: {
    ...mapGetters(["version", "quota", "externalNetworkDests"]),
  },
  methods: {
    ...mapActions(["getQuota"]),
    openApprovalService(destination) {
      usersApi.openAboutMePage(destination);
    },
    handle_function_call(function_name, args) {
      this[function_name](args);
    },
  },
  created() {
    this.getQuota();
  },
};
</script>

<style>
.sidenav-submenu-title .v-icon {
  color: #fff9e5 !important;
}
</style>

<style scoped>
#sidenav {
  background-image: linear-gradient(to bottom, #347a99, #2f7e71);
  display: block;
}
.sidenav-subitem {
  background-image: linear-gradient(to left, #347a99, #2f7e71);
  background-color: #072333;
  background-blend-mode: screen;
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
.sidenav-submenu-title {
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
