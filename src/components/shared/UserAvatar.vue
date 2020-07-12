<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn small fab v-on="on" id="avatar" :color="color">{{getUserName()}}</v-btn>
    </template>
    <span>{{user.fullName}}</span>
  </v-tooltip>
</template>

<script>
import randomColor from "randomcolor";

export default {
  name: "UserAvatar",
  props: ["user"],
  data() {
    return {
      color: this.getColor()
    };
  },
  methods: {
    /**
     * getUserName returns the formated user name
     */
    getUserName() {
      const firstName = this.user.firstName[0] || "";
      const lastName = this.user.lastName[0] || "";

      return `${firstName}${lastName}`;
    },
    getColor() {
      const color = randomColor();
      return color;
    }
  }
};
</script>

<style scoped>
#avatar {
  margin: 5px;
}
</style>