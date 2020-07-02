<template>
  <v-tooltip top v-if="chosenFiles.length===1 && canPreview()" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn @click="$refs.popup.open()" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/favorites.png" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Preview") }}</p>
      </v-btn>
    </template>
    <Preview ref="popup" :file="chosenFiles[0]" />
    <span>{{ $t("buttons.Preview") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import { previewTypes, mediaTypes } from "@/utils/config";
import Preview from "@/components/popups/Preview";

export default {
  name: "PreviewButton",
  props: ["icon"],
  computed: {
    ...mapGetters(["chosenFiles"])
  },
  components: { Preview },
  methods: {
    canPreview() {
      return (
        this.isIframe(this.chosenFiles[0].type) ||
        this.checkMimeType(this.chosenFiles[0].type)
      );
    },
    isIframe(type) {
      for (let k = 0; k < previewTypes.length; k++) {
        if (type.startsWith(previewTypes[k])) {
          return true;
        }
      }

      return false;
    },
    checkMimeType(type) {
      for (let k = 0; k < mediaTypes.length; k++) {
        if (type.startsWith(mediaTypes[k])) {
          return true;
        }
      }

      return false;
    }
  }
};
</script>