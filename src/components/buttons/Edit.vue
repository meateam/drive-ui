<template>
  <v-tooltip top v-if="chosenFiles.length===1">
    <template v-slot:activator="{ on }">
      <v-btn @click="$refs.rename.open()" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/edit.png" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Edit") }}</p>
      </v-btn>
    </template>
    <CreatePopup img="newFolder.png" ref="rename" type="rename" @confirm="onConfirm" />
    <span>{{ $t("buttons.Edit") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import CreatePopup from "../popups/CreatePopup";

export default {
  name: "Edit",
  props: ["icon"],
  components: { CreatePopup },
  computed: {
    ...mapGetters(["chosenFiles"])
  },
  methods: {
    onConfirm(name) {
      this.$store.dispatch("editFile", { name, file: this.chosenFiles[0] });
    }
  }
};
</script>