<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon @click="$emit('click')">
        <img class="fab-icon" :src="require(`@/assets/icons/${icon}`)" />
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "IconButton",
  props: ["tooltip", "icon"],
};
</script>

<style>
</style>