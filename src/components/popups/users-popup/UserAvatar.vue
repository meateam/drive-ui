<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn small elevation="0" fab v-on="on" v-bind:style="{ margin: marginSize + 'px' }" :color="color">{{
        getUserName()
      }}</v-btn>
    </template>
    <span v-if="user.role">{{ `${user.fullName} - ${$t(`share.role.${user.role}`)}` }}</span>
    <span v-else>{{ user.fullName }}</span>
  </v-tooltip>
</template>

<script>
import { getColor } from "@/utils/getColor";

export default {
  name: "UserAvatar",
  props: ["user", "margin"],
  data() {
    return {
      color: this.getColor(),
    };
  },
  computed: {
    marginSize: function() {
      return this.margin ? this.margin : 5;
    },
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
      return getColor(this.user.id);
    },
  },
};
</script>
