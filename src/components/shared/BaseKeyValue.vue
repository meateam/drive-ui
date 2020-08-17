<template>
  <div class="flex">
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
  font-family: Assistant-Light;
  margin-right: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  direction: ltr;
  max-width: 300px;
}
</style>