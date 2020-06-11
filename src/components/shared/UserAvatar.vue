<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-avatar :v-on="on" color="indigo">{{getUserName()}}</v-avatar>
    </template>
    <span>{{`${user.firstName} ${user.lastName}`}}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "UserAvatar",
  props: ["user"],
  methods: {
    /**
     * getUserName returns the formated user name
     */
    getUserName() {
      const firstName = this.user.firstName.charAt(0) || "";
      const lastName = this.user.lastName.charAt(0) || "";

      return `${firstName}${lastName}`;
    }
  }
};
</script>