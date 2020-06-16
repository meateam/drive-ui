<template>
  <v-chip color="#357e6f" id="chip">
    <img id="user-icon" src="@/assets/icons/user.png" />
    <p>{{`${user.firstName} ${user.lastName ? user.lastName: ""}`}}</p>
    <v-btn icon color="white" @click="$emit('remove', user)">
      <v-icon id="close-icon">close</v-icon>
    </v-btn>
  </v-chip>
</template>

<script>
export default {
  name: "Chips",
  props: ["user"],
};
</script>

<style scoped>
#user-icon {
  width: 10px;
  margin-left: 5px;
}
#chip {
  margin-bottom: 9px;
  color: white;
}
#close-icon {
  font-size: 15px;
}
.v-btn--icon.v-size--default {
  width: 22px;
  margin-right: 5px;
  height: 22px;
}
</style>