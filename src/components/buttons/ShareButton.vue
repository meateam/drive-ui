<template>
  <v-tooltip top :disabled="!icon" v-if="canShare()">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.share.open()"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        id="share-button"
        text
        :class="{right: !icon}"
      >
        <img class="fab-icon" src="@/assets/icons/share.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Share") }}</p>
      </v-btn>
    </template>
    <span>{{ $t("buttons.Share") }}</span>
    <SharePopup ref="share" :files="chosenFiles" />
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { writeRole } from "@/utils/roles";
import SharePopup from "@/components/popups/share-popup/SharePopup";

export default {
  name: "Share",
  components: { SharePopup },
  computed: {
    ...mapGetters(["currentFolder", "chosenFiles"]),
  },
  props: ["icon"],
  methods: {
    canShare() {
      return (
        (!this.currentFolder || writeRole(this.currentFolder.role)) &&
        this.chosenFiles.every((file) => writeRole(file.role))
      );
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