<template>
  <v-tooltip top :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="$refs.CreateShortcutPopup.open()"
        v-on="on"
        :icon="icon"
        :class="{ right: !icon }"
        class="auto-margin"
        id="shortcut-button"
        text
      >
        <img class="fab-icon" src="@/assets/icons/move-shortcut-to.svg" />
        <p class="button-text" v-if="!icon">
          {{ $t("buttons.CreateShortcut") }}
        </p>
      </v-btn>
    </template>

    <CreateShortcutPopup
      ref="CreateShortcutPopup"
      :files="chosenFiles"
      @confirm="onSubmit"
    />
    <span>{{ $t("buttons.CreateShortcut") }}</span>
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
    onSubmit() {
      const fileID = this.chosenFiles[0].id;
      const parent = this.chosenFiles[0].parent;
      const name = this.chosenFiles[0].name;

      this.$store.dispatch("createShortcut", { fileID, parent, name });
      this.$emit("close");
    },
  },
};
</script>
