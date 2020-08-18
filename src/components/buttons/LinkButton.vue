<template>
  <v-tooltip top :disabled="!icon">
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
    <LinkPopup ref="popup" />
    <span>{{ $t("buttons.Link") }}</span>
  </v-tooltip>
</template>

<script>
import LinkPopup from "../popups/LinkPopup";

export default {
  name: "LinkButton",
  props: ["icon"],
  components: { LinkPopup },
};
</script>