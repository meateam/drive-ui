<template>
  <v-tooltip top :disabled="!icon" v-if="chosenFiles.length===1">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.popup.open()"
        v-on="on"
        :icon="icon"
        :class="{right: !icon}"
        class="auto-margin"
        text
      >
        <v-icon class="fab-icon" size="18" color="#FFF9E5">share</v-icon>
        <p class="button-text" v-if="!icon">{{ $t("buttons.Link") }}</p>
      </v-btn>
    </template>
    <LinkPopup ref="popup" :file="chosenFiles[0]" />
    <span>{{ $t("buttons.Link") }}</span>
  </v-tooltip>
</template>

<script>
import LinkPopup from "../popups/LinkPopup";
import { mapGetters } from "vuex";

export default {
  name: "LinkButton",
  props: ["icon"],
  computed: {
    ...mapGetters(["chosenFiles"]),
  },
  components: { LinkPopup },
};
</script>