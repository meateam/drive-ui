<template>
  <v-list max-height="255" v-if="items.length">
    <v-list-item
      link
      v-for="(item, index) in items"
      :key="index"
      @dblclick="onChoose(item)"
    >
      <v-list-item-icon v-if="icon">
        <v-icon color="#fc8946" class="icons">{{ icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ item.name }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      selected: undefined,
    };
  },
  props: ["items", "icon"],
  methods: {
    onChoose(item) {
      this.$emit("change", item);
    },
  },
};
</script>

<style scoped>
.v-list {
  overflow: auto;
  margin: 20px 0;
}
</style>