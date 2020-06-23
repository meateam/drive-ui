<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn @click="onDelete" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/delete.png" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Delete") }}</p>
      </v-btn>
    </template>
    <span>{{ $t("buttons.Delete") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Delete",
  props: ["icon"],
  methods: {
    onDelete() {
      this.$store.dispatch("deleteFiles", this.chosenFiles);
    }
  },
  computed: {
    ...mapGetters(["chosenFiles"])
  }
};
</script>
