<template>
  <div class="field-container">
    <p>{{field}}</p>
    <p id="value">{{value}}</p>
  </div>
</template>

<script>
export default {
  name: "KeyValue",
  props: ["field", "value"]
};
</script>

<style scoped>
p {
  font-size: 17px;
  color: #1b2e35;
}
#value {
  font-family: Rubik-Light;
  margin-right: 15px;
}
.field-container {
  display: flex;
}
</style>