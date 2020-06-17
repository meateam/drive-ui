<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <div>
        <v-avatar size="35" :v-on="on" id="avatar" :color="getColor()">{{getUserName()}}</v-avatar>
      </div>
    </template>
    <span>{{user.fullName}}</span>
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
#avatar {
  margin: 5px;
}
</style>