<template>
  <v-navigation-drawer absolute permanent right id="sidenav">
    <v-list nav>
      <v-list-item id="logo-container">
        <v-list-item-content>
          <v-list-item-title class="title">
            <img id="logo" class="auto-margin" src="@/assets/images/logo.png" />
          </v-list-item-title>
          <v-list-item-title id="version">{{version}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <router-link to="/my-drive">
        <v-list-item link>
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/home.png" />
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidenav.MyDrive") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      <v-list-item link @click.stop="openFolders" id="folder-item">
        <v-list-item-icon>
          <img class="icons" src="@/assets/icons/folder.png" />
        </v-list-item-icon>
        <v-list-item-title>{{ $t("sidenav.Folders") }}</v-list-item-title>
        <v-list-item-icon>
          <img src="@/assets/icons/arrow.svg" />
          <Folders ref="folderPopup" />
        </v-list-item-icon>
      </v-list-item>

      <router-link to="/shared-with-me">
        <v-list-item link>
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/shared.png" />
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidenav.SharedWithMe") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/last-update">
        <v-list-item link>
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/latest.png" />
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidenav.LastUpdate") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/favorites">
        <v-list-item link>
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/favorites.png" />
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidenav.Favorites") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/deleted-files">
        <v-list-item link>
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/delete.png" />
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidenav.Deleted") }}</v-list-item-title>
        </v-list-item>
      </router-link>

      <div id="quota-container">
        <v-list-item id="quota-list-item">
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/storage.png" />
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidenav.Quota.Quota") }}</v-list-item-title>
        </v-list-item>
        <Quota :quota="quota" />
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Quota from "./quota/Quota";
import Folders from "@/components/shared/popups/Folders";

export default {
  name: "Sidenav",
  components: { Quota, Folders },
  computed: {
    ...mapGetters(["version", "quota"])
  },
  methods: {
    ...mapActions(["getQuota"]),
    openFolders() {
      this.$refs.folderPopup.open();
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
.v-list {
  padding: 0;
}
.v-list-item {
  border-bottom: #255f53 solid 1px;
  margin: 0;
  height: 70px;
  font-weight: 700;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: #c8d9d5 !important;
  margin: 0;
}
.v-list--nav .v-list-item,
.v-list--nav .v-list-item:before {
  border-radius: 0;
}
.v-list-item__icon {
  margin: auto;
  margin-left: 7px;
}
#logo-container {
  height: 86px;
}
#logo {
  padding-bottom: 5px;
}
.icons {
  width: 18px;
}
#quota {
  display: block;
}
#quota-list-item {
  border: none;
  height: 40px;
}
#quota-container {
  border-bottom: #255f53 solid 1px;
}
#version {
  text-align: center;
}
#folder-item {
  position: relative;
}
</style>