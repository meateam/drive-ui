<template>
  <v-btn text small @click="$emit('click')">
    <p id="back-button">{{$t('buttons.ClickHere')}}</p>
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
  color: #357e6f;
  text-decoration: underline;
}
</style>