<template>
  <v-tooltip v-if="favButtonAppear()" top :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="onFavButton()"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        id="share-button"
        text
        :class="{ right: !icon }"
      >
        <img class="fab-icon" src="@/assets/icons/white-star.svg" />
        <p class="button-text" v-if="!icon && !isFav()" >{{ $t("buttons.Favorite") }}</p>
        <p class="button-text" v-if="!icon && isFav()" >{{ $t("buttons.RemoveFavorite") }}</p>
      </v-btn>
    </template>
    <span v-if="!isFav()" >{{ $t("buttons.Favorite") }}</span>
    <span v-if="isFav()" >{{ $t("buttons.RemoveFavorite") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FavoriteButton",
  computed: {
    ...mapGetters(["chosenFiles"]),
  },
  props: ["icon"],
  methods: {
    favButtonAppear() {
      return this.chosenFiles.every((file) => file.isFavorite) || this.chosenFiles.every((file) => !file.isFavorite) ? true : false
    },
    onFavButton() {
      this.$store.dispatch("addOrRemoveFavs", this.chosenFiles)
    },
    isFav() {
      return this.chosenFiles.length === 0 ? false : this.chosenFiles[0].isFavorite
    }
  },
};
</script>

<style scoped>
</style>
