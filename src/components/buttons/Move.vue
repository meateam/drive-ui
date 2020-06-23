<template>
  <v-tooltip top :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn @click="$emit('click')" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/move.png" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Move") }}</p>
      </v-btn>
    </template>
    <span>{{ $t("buttons.Move") }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "Move",
  props: ["icon"]
};
</script>