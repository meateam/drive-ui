<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn @click="$refs.share.open()" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/share.png" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Share") }}</p>
      </v-btn>
    </template>
    <span>{{ $t("buttons.Share") }}</span>
    <SharePopup ref="share" />
  </v-tooltip>
</template>

<script>
import SharePopup from "@/components/popups/share/Share";

export default {
  name: "Share",
  components: { SharePopup },
  props: ["icon"]
};
</script>
