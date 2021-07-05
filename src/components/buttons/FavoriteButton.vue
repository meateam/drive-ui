<template>
  <v-tooltip top :disabled="!icon" v-if="canShare()">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="mayaqueen()"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        id="share-button"
        text
        :class="{ right: !icon }"
      >
        <img class="fab-icon" src="@/assets/icons/favorites.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Favorite") }}</p>
      </v-btn>
    </template>
    <span>{{ $t("buttons.Favorite") }}</span>
  </v-tooltip>
</template>
<script>
import { mapGetters } from "vuex";
import { writeRole } from "@/utils/roles";

export default {
  name: "Favorite",
  computed: {
    ...mapGetters(["currentFolder", "chosenFiles"]),
  },
  props: ["icon"],
  methods: {
    canShare() {
      console.log("in can share method")
      return (
        (!this.currentFolder || writeRole(this.currentFolder.role)) &&
        this.chosenFiles.every((file) => writeRole(file.role)) &&
        !this.isFileReadOnly()
      );
    },
    isFileReadOnly() {
      return this.chosenFiles.every((file) => file?.isReadOnly != undefined && file.isReadOnly);
    },
    mayaqueen() {
      console.log("maya queen")

    }
  },
};
</script>

<style scoped>
.fab-icon {
  width: 21px;
  height: 14px;
}
</style>
