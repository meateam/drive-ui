<template>
  <v-btn @click="$emit('click')" id="confirm-button">
    <p>{{$t('buttons.Confirm')}}</p>
  </v-btn>
</template>

<script>
export default {
  name: "Confirm"
};
</script>
<style scoped>
#confirm-button {
  width: 114px;
  height: 44px;
  line-height: 44px;
  border-radius: 22px;
  box-shadow: 0px 3px 8px 0 rgba(44, 52, 72, 0.4);
  background-color: #2c3448;
  color: white;
  font-size: 20px;
}
</style>