<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <p v-on="on" id="value">{{ value }}</p>
    </template>
    <span>{{ value }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "BaseTooltip",
  props: ["value"],
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
}
</style>
