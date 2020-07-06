<template>
  <v-tooltip top v-if="chosenFiles.length===1" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn @click="$refs.popup.open()" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/info.png" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Info") }}</p>
      </v-btn>
    </template>
    <InfoPopup ref="popup" :file="chosenFiles[0]" />
    <span>{{ $t("buttons.Info") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import InfoPopup from "@/components/popups/BaseInfoPopup";

export default {
  name: "InfoButton",
  props: ["icon"],
  computed: {
    ...mapGetters(["chosenFiles"])
  },
  components: { InfoPopup }
};
</script>