<template>
  <v-chip outlined color="035c64" id="chip">
    <p>{{searchBy}}</p>
    <v-btn icon color="#035c64" @click="$emit('remove', searchBy)">
      <v-icon id="close-icon">close</v-icon>
    </v-btn>
  </v-chip>
</template>

<script>
export default {
  name: "AdvancedSearchChips",
  props: ["searchBy"],
};
</script>

<style scoped>
#chip {
  /* margin: 6px 4px; */
  color: #035c64;
  direction: rtl;
  background-color: white !important;
  border-color: #035c64 !important;
  font-size: smaller;
  width: 100px;
  margin-right: 5px;
  height: 20px;
}
#close-icon {
  font-size: 15px;
}
</style>