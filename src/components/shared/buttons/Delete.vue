<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn @click="$emit('click')" v-on="on" icon class="auto-margin">
        <img class="fab-icon" src="@/assets/icons/delete.png" />
      </v-btn>
    </template>
    <span>{{ $t("buttons.Delete") }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name:"Delete"
};
</script>
