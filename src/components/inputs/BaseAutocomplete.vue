<template>
  <v-autocomplete
    v-model="item"
    @input="onSelect"
    @update:search-input="onInput"
    @keyup.enter.native="onEnter"
    no-filter
    :items="items"
    :loading="isLoading"
    rounded
    filled
    dense
    item-text="display"
    return-object
    :append-icon="icon"
    color="#035c64"
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
    item: null,
    value: ""
  }),
  props: [
    "placeholder",
    "items",
    "background",
    "icon",
    "isLoading",
    "minLength"
  ],
  methods: {
    onSelect() {
      this.$emit("select", this.item);
    },
    onEnter() {
      this.item = "";
      this.$emit("enter", this.value);
    },
    onInput(value) {
      this.value = value;
      this.onSearch(value);
    },
    onSearch: debounce(function(value) {
      if (typeof value === "string" && value.length >= this.minLength)
        this.$emit("type", value);
    }, 500)
  }
};
</script>

<style scoped>
#no-resault {
  padding-right: 20px;
}
</style>