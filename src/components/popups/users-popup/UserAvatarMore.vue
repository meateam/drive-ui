<template>
  <v-btn small elevation="0" fab v-bind:style="{ margin: marginSize + 'px' }" :color="color" @click="$emit('click')">
    <h2>...</h2>
  </v-btn>
</template>

<script>
export default {
  name: "UserAvatarMore",
  props: ["margin"],
  data() {
    return {
      color: "#E0E6DE",
    };
  },
  computed: {
    marginSize: function() {
      return this.margin ? this.margin : 5;
    },
  },
};
</script>
