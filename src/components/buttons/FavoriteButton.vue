<template>
  <v-tooltip top :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="onFav()"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        id="share-button"
        text
        :class="{ right: !icon }"
      >
        <img class="fab-icon" src="@/assets/icons/favorites.svg" />
        <p class="button-text" v-if="!icon" >{{ $t("buttons.Favorite") }}</p>
        <!-- <p class="button-text" v-if="!icon" >{{ $t("buttons.RemoveFavorite") }}</p> -->
      </v-btn>
    </template>
    <span>{{ $t("buttons.Favorite") }}</span>
  </v-tooltip>
</template>
<script>

import { mapGetters } from "vuex";
import * as favApi from "@/api/favorite";


export default {
  name: "FavoriteButton",
  computed: {
    ...mapGetters(["currentFolder", "chosenFiles"]),
  },
  props: ["icon"],
  methods: {

    onFav() {
      this.chosenFiles.forEach((file) => {
        if (!file.isFavorite) {
          file.isFavorite = true;
          favApi.addFavorite({fileID: file.id})
        } else {
          file.isFavorite = false
          favApi.deleteFavorite({fileID: file.id})
        }

      })
    },
  },
};
</script>

<style scoped>
.fab-icon {
  width: 21px;
  height: 14px;
}
</style>
