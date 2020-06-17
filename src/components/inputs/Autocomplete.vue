<template>
  <v-autocomplete
    v-model="value"
    @input="onSelect"
    @update:search-input="onSearch"
    :items="items"
    :loading="isLoading"
    rounded
    filled
    dense
    hide-no-data
    item-text="display"
    return-object
    :append-icon="icon"
    :background-color="background"
    :placeholder="placeholder"
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>{{ $t('autocomplete.NoResult')}}</v-list-item-title>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  data: () => ({
    value: ""
  }),
  props: ["placeholder", "items", "background", "icon", "isLoading"],
  methods: {
    onSelect() {
      this.$emit("select", this.value);
    },
    onSearch: debounce(function(value) {
      if (value && value.length >= 2) this.$emit("type", value);
    }, 500)
  }
};
</script>