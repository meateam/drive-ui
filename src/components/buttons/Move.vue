<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn @click="$emit('click')" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/move.png" />
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