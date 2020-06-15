<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-avatar :v-on="on" :color="getColor()">{{getUserName()}}</v-avatar>
    </template>
    <span>{{`${user.firstName} ${user.lastName}`}}</span>
  </v-tooltip>
</template>

<script>
import randomColor from "randomcolor";

export default {
  name: "Avatar",
  props: ["user"],
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
</style>