<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn @click="$emit('click')" v-on="on" icon class="auto-margin">
        <img class="fab-icon" src="@/assets/icons/download.png" />
      </v-btn>
    </template>
    <span>{{ $t("buttons.Download") }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name:"Download"
};
</script>

<style>
</style>