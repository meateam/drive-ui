<template>
  <v-tooltip top v-if="chosenFiles.length===1">
    <template v-slot:activator="{ on }">
      <v-btn @click="$refs.fileInfo.open()" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/info.png" />
      </v-btn>
    </template>
    <InfoPopup ref="fileInfo" :file="chosenFiles[0]" />
    <span>{{ $t("buttons.Info") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import InfoPopup from "@/components/popups/Info";

export default {
  name: "Info",
  props: ["icon"],
  computed: {
    ...mapGetters(["chosenFiles"])
  },
  components: { InfoPopup }
};
</script>