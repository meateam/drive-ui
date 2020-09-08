<template>
  <v-btn text small @click="$emit('click')" id="back-button" class="space-left">
    <p>{{label}}</p>
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
  font-size: 16px;
}
</style>