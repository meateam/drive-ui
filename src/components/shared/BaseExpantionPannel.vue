<template>
  <v-expansion-panels popout>
    <v-expansion-panel v-for="(item,i) in items" :key="i">
      <v-expansion-panel-header>{{item.header}}</v-expansion-panel-header>
      <v-expansion-panel-content>{{item.content}}</v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "ExpantionPannel",
  props: ["items"]
};
</script>