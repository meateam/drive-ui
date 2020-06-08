<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon class="auto-margin">
        <img class="fab-icon" src="@/assets/icons/chat.png" />
      </v-btn>
    </template>
    <span>{{ $t("header.connect") }}</span>
  </v-tooltip>
</template>

<script>
export default {
    name: "Chat"
};
</script>