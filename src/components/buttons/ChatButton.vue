<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn @click="$refs.popup.open()" v-on="on" icon class="auto-margin" id="chat-button">
        <img src="@/assets/icons/chat.svg" />
      </v-btn>
    </template>
    <SupportPopup ref="popup" />
    <span>{{ $t("header.connect") }}</span>
  </v-tooltip>
</template>

<script>
import SupportPopup from "../popups/SupportPopup";

export default {
  name: "Chat",
  components: { SupportPopup },
};
</script>