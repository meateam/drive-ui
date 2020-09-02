<template>
  <v-tooltip top v-if="chosenFiles.length===1 && isPreviewAvailable()" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.popup.open(chosenFiles[0])"
        v-on="on"
        :icon="icon"
        :class="{right: !icon}"
        class="auto-margin"
        id="preview-button"
        text
      >
        <img class="fab-icon" src="@/assets/icons/preview.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Preview") }}</p>
      </v-btn>
    </template>
    <Preview ref="popup" />
    <span>{{ $t("buttons.Preview") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { canPreview } from "@/utils/canPreview";
import Preview from "@/components/popups/Preview";

export default {
  name: "PreviewButton",
  props: ["icon"],
  computed: {
    ...mapGetters(["chosenFiles"])
  },
  methods: {
    isPreviewAvailable() {
      return canPreview(this.chosenFiles[0].type);
    }
  },
  components: { Preview }
};
</script>