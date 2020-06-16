<template>
  <v-autocomplete
    v-model="value"
    @change="onChange"
    @update:search-input="onSearch"
    :items="items"
    rounded
    filled
    dense
    :append-icon="icon"
    :background-color="background"
    :placeholder="placeholder"
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>{{ $t('autocomplete.NoResult')}}</v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:item="{ item }">{{item.display}}</template>
    <template v-slot:selection />
  </v-autocomplete>
</template>

<script>
export default {
  data: () => ({
    value: ""
  }),
  props: ["placeholder", "items", "background", "icon"],
  methods: {
    onChange() {
      this.$emit("select", this.value);
      this.value = "";
    },
    onSearch(value) {
      if (value && value.length > 2) this.$emit("type", value);
    }
  }
};
</script>