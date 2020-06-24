<template>
  <v-btn text small @click="$emit('click')">
    <p id="back-button">{{$t('buttons.Back')}}</p>
  </v-btn>
</template>

<script>
export default {
  name: "Back"
};
</script>

<style scoped>
#back-button {
  font-size: 20px;
}
</style>