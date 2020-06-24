<template>
  <v-btn text small @click="$emit('click')">
    <p id="back-button">{{label}}</p>
  </v-btn>
</template>

<script>
export default {
  name: "Back",
  props: ["label"]
};
</script>

<style scoped>
#back-button {
  font-size: 20px;
}
</style>