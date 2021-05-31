<template>
  <v-autocomplete
    color="gray"
    v-model="item"
    :search-input="value"
    :items="items"
    :item-text="getValue(item)"
    :placeholder="placeholder"
    :loading="isLoading"
    :background-color="background"
    :menu-props="{ maxHeight: 'none' }"
    @click="closeAdvancedSearch"
    @update:search-input="onInput"
    @keyup.enter.native="onEnter"
    rounded
    filled
    no-filter
    return-object
    clearable
  >
    <!-- item result -->
    <template v-slot:item="{ item }">
      <AdvancedSearchItemResult :item="item" @openItemLocation="openItemLocation" @select="onSelect" />
    </template>

    <!-- basic search icon (right icons) -->
    <template v-slot:prepend-inner>
      <v-icon>{{ searchIcon }}</v-icon>
    </template>

    <!-- (left icons) -->
    <template v-slot:append>
      <!-- open advanced search icon -->
      <v-btn small icon @click="openAdvancedSearch">
        <v-icon>{{ advancedSearchIcon }}</v-icon>
      </v-btn>
    </template>

    <!-- advanced search form -->
    <template v-if="isAdvancedSearchOpen" v-slot:prepend-item>
      <AdvancedSearchMenu :form="form" @onClearForm="onClearForm" @moreResults="onClickShowMoreResults" />
      <v-divider></v-divider>
    </template>

    <!-- no data -->
    <template v-slot:no-data>
      <p v-if="!isAdvancedSearchOpen" id="no-result">{{ $t(`autocomplete.${noResult || "NoResult"}`) }}</p>
      <p v-else></p>
    </template>
  </v-autocomplete>
</template>

<script>
import debounce from "lodash/debounce";
import AdvancedSearchMenu from "@/components/layout/toolbar/search/AdvancedSearchMenu";
import AdvancedSearchItemResult from "@/components/layout/toolbar/search/AdvancedSearchItemResult";

import { isDictEmpty } from "@/utils/dictUtils";

export default {
  components: { AdvancedSearchMenu, AdvancedSearchItemResult },
  data: () => ({
    item: null,
    value: "",
    form: {},
    isAdvancedSearchOpen: false,
  }),
  props: [
    "searchIcon",
    "advancedSearchIcon",
    "placeholder",
    "background",
    "isLoading",
    "minLength",
    "noResult",
    "items",
  ],
  methods: {
    getValue(item) {
      return item ? (item.file ? "file.display" : "display") : "";
    },
    openAdvancedSearch() {
      this.isAdvancedSearchOpen = true;
    },
    closeAdvancedSearch() {
      this.isAdvancedSearchOpen = false;
    },
    openItemLocation(item) {
      this.$emit("openItemLocation", item);
    },
    onSelect(item) {
      this.item = item;
      this.$emit("select", this.item);
    },
    onEnter() {
      this.$emit("enter", this.value);
    },
    onInput(value) {
      this.value = value;
      this.onSearch(value);
    },
    onClickShowMoreResults() {
      this.$emit("enter", JSON.stringify(this.form));
    },
    onClearForm() {
      this.form = {};
      this.item = null;
      this.$emit("clear");
    },
    onSearch: debounce(function(value) {
      if (typeof value === "string" && value.length >= this.minLength) this.$emit("type", value);
      else if (!value || value.length === 0) this.$emit("clear");
    }, 500),
  },
  watch: {
    form: {
      handler(newForm) {
        let tempForm = newForm;
        Object.keys(newForm).forEach((key) => {
          if (newForm[key] == "") delete tempForm[key];
        });

        this.form = tempForm;

        // If the form isn't empty, create search request
        isDictEmpty(tempForm) ? this.$emit("clear") : this.onSearch(JSON.stringify(tempForm));
      },
      deep: true,
    },
    items(newResults) {
      this.items = newResults;
    },
    value(newValue) {
      if (newValue) this.form = {};
    },
  },
};
</script>

<style scoped>
#no-result {
  padding-right: 20px;
}
</style>
