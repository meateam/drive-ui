<template>
  <v-chip color="#035c64" id="chip">
    <v-icon id="user-icon">person_outline</v-icon>
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
  font-size: 18px;
  margin-left: 5px;
}
#chip {
  margin: 6px 4px;
  color: white;
  direction: rtl;
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