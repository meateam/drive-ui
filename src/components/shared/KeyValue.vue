<template>
  <div class="field-container">
    <p id="field">{{field}}</p>
    <p id="value">{{value}}</p>
  </div>
</template>

<script>
export default {
  name: "KeyValue",
  props: ["field", "value"],
};
</script>

<style scoped>
p {
  font-size: 17px;
  text-shadow: 0px 1px 6px rgba(42, 87, 120, 0.1);
  color: #1b2e35;
}
#field {
  font-family: Rubik;
  margin-left: 15px;
}
#value {
  font-family: Rubik-Light;
}
.field-container {
  display: flex;
}
</style>