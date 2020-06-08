<template>
  <v-navigation-drawer absolute permanent right class="sidenav">
    <v-list nav>
      <v-list-item id="logo-container">
        <v-list-item-content>
          <v-list-item-title class="title">
            <img id="logo" src="@/assets/images/logo.png" />
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

      <v-list-item link>
        <v-list-item-icon>
          <img class="icons" src="@/assets/icons/folder.png" />
        </v-list-item-icon>
        <v-list-item-title>{{ $t("sidenav.Folders") }}</v-list-item-title>
        <v-list-item-icon>
          <img src="@/assets/icons/arrow.svg" />
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

      <router-link to="/last-upload">
        <v-list-item link>
          <v-list-item-icon>
            <img class="icons" src="@/assets/icons/latest.png" />
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidenav.LastUpload") }}</v-list-item-title>
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
            <img class="icons" src="@/assets/icons/deleted.png" />
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
        <Quota :quota="{used: 0, limit: 0}" />
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Quota from "./quota/Quota";
export default {
  name: "Sidenav",
  components: { Quota },
  data() {
    return {
      version: "2.0"
    };
  }
};
</script>

<style scoped>
.sidenav {
  background-image: linear-gradient(to bottom, #357e6f, #4d804d);
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
  display: block;
  margin: auto;
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
</style>