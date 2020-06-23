<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn @click="$emit('click')" v-on="on" :icon="icon" class="auto-margin" text>
        <img class="fab-icon" src="@/assets/icons/edit.png" />
        <p class="button-text" v-if="!icon">{{ $t("buttons.Edit") }}</p>
      </v-btn>
    </template>
    <span>{{ $t("buttons.Edit") }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "Edit",
  props: ["icon"]
};
</script>