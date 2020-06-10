<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn  @click="nevigateToChat()" v-on="on" icon class="auto-margin">
        <img class="fab-icon" src="@/assets/icons/chat.png" />
      </v-btn>
    </template>
    <span>{{ $t("header.connect") }}</span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Chat",
  computed: {
    ...mapGetters(["supportLink"])
  },
  methods: {
    nevigateToChat() {
      window.location.href = this.supportLink;
    }
  }
};
</script>