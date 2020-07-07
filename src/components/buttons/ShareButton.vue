<template>
  <v-tooltip top :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn @click="$refs.share.open()" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/share.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Share") }}</p>
      </v-btn>
    </template>
    <span>{{ $t("buttons.Share") }}</span>
    <SharePopup ref="share" />
  </v-tooltip>
</template>

<script>
import SharePopup from "@/components/popups/share/SharePopup";

export default {
  name: "Share",
  components: { SharePopup },
  props: ["icon"]
};
</script>
