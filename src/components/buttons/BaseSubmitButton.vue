<template>
  <v-btn @click="$emit('click')" id="confirm-button" :disabled="disabled">
    <p>{{label}}</p>
  </v-btn>
</template>

<script>
export default {
  name: "SubmitButton",
  props: ["label", "disabled"]
};
</script>
<style scoped>
#confirm-button {
  min-width: 100px;
  width: fit-content;
  height: 40px;
  line-height: 44px;
  border-radius: 22px;
  box-shadow: 0 3px 8px 0 rgba(44, 52, 72, 0.4);
  background-color: #2c3448;
  color: white;
  margin: 10px 0 8px 5px;
  font-size: 20px;
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  box-shadow: none !important;
}
</style>