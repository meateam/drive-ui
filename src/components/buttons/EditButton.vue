<template>
  <v-tooltip top v-if="chosenFiles.length===1" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.rename.open()"
        v-on="on"
        :icon="icon"
        :class="{right: !icon}"
        class="auto-margin"
        text
      >
        <img class="fab-icon" src="@/assets/icons/edit.svg" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Edit") }}</p>
      </v-btn>
    </template>
    <NamePopup img="green-edit.svg" ref="rename" type="rename" @confirm="onConfirm" />
    <span>{{ $t("buttons.Edit") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import NamePopup from "../popups/BaseNamePopup";

export default {
  name: "EditButton",
  props: ["icon"],
  components: { NamePopup },
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