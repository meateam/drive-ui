<template>
  <v-tooltip top v-if="shortcutButtonApeear()" :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.CreateShortcutPopup.open()"
        v-on="on"
        :icon="icon"
        class="auto-margin"
        id="shortcut-button"
        text
        :class="{ right: !icon }"
      >
        <img class="fab-icon" src="@/assets/icons/shortcut.svg" />
        <p class="button-text" v-if="!icon && !isShortcut()">{{ $t("buttons.CreateShortcut") }}</p>
      </v-btn>
    </template>
    <span v-if="!isShortcut()" >{{ $t("buttons.CreateShortcut") }}</span>;

    <CreateShortcutPopup ref="CreateShortcutPopup" :files="chosenFiles" @confirm="onSubmit" />
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
import CreateShortcutPopup from "@/components/popups/CreateShortcutPopup";

export default {
  name: "CreateShortcutButton",
  props: ["icon"],
  components: { CreateShortcutPopup },
  computed: {
    ...mapGetters(["chosenFiles", "currentFolder"]),
  },
  methods: {
    shortcutButtonApeear() {
      return !this.isShortcut() && this.chosenFiles.length ===1;
    },
    onSubmit() {
      const fileID = this.chosenFiles[0].id;
      const name = this.chosenFiles[0].name;
      const parent = this.chosenFiles[0].parent;

      this.$store.dispatch("createShortcut", { fileID, parent, name });
      this.$emit("close");
    },
    isShortcut() {
      return this.chosenFiles.length === 0 ? false : this.chosenFiles[0].isShortcut;
    }
  },
};
</script>
