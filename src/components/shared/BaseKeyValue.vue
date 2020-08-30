<template>
  <div class="flex">
    <p>{{field}}</p>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <p v-on="on" id="value">{{value}}</p>
      </template>
      <span>{{value}}</span>
    </v-tooltip>
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
  color: #1b2e35;
}
#value {
  font-family: Assistant-Light;
  margin-right: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  direction: ltr;
  max-width: 150px;
}
</style>