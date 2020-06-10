<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn @click="nevigateToChat()" v-on="on" icon class="auto-margin">
        <img class="fab-icon" src="@/assets/icons/move.png" />
      </v-btn>
    </template>
    <span>{{ $t("button.Move") }}</span>
  </v-tooltip>
</template>

<script>
export default {};
</script>

<style>
</style>