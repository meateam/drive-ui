<template>
  <v-tooltip top v-if="chosenFiles.length===1" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn @click="$refs.fileInfo.open()" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/info.png" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Info") }}</p>
      </v-btn>
    </template>
    <FileInfo ref="fileInfo" :file="chosenFiles[0]" />
    <span>{{ $t("buttons.Info") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import FileInfo from "@/components/popups/FileInfo";

export default {
  name: "Info",
  props: ["icon"],
  computed: {
    ...mapGetters(["chosenFiles"])
  },
  components: { FileInfo }
};
</script>