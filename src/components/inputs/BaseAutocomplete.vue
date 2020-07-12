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
    item-text="display"
    return-object
    :append-icon="icon"
    :background-color="background"
    :placeholder="placeholder"
  >
    <template v-slot:no-data>
      <p id="no-resault">{{ $t('autocomplete.NoResult')}}</p>
    </template>
  </v-autocomplete>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  data: () => ({
    value: []
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

<style scoped>
#no-resault {
  padding-right: 20px;
}
</style>