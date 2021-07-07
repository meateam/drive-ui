<template>
  <v-autocomplete
    v-model="selectedItem"
    :items="items"
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
    persistent-placeholder
    color="gray"
  >
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
      <AdvancedSearchMenu
        :form="form"
        @onClearForm="onClearForm"
        @moreResults="onClickShowMoreResults"
        @updateForm="updateForm"
      />
      <v-divider></v-divider>
    </template>

    <!-- item result -->
    <template v-slot:item="{ item }">
      <AdvancedSearchItemResult :item="item" @openItemLocation="openItemLocation" @select="onSelect" />
    </template>

    <template v-slot:selection="{ item }">{{ getValue(item) }}</template>
    <!-- more results -->
    <template v-slot:append-item>
      <v-btn v-if="itemsLength > pageSizeSearch - 1" @click="onClickShowMoreResults" block depressed>
        {{ $t("header.AdvancedSearchShowMore") }}
      </v-btn>
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
import { isDictEmpty, removeEmptyValuesFromDict } from "@/utils/dictUtils";
import { pageSizeAdvancedSearch } from "@/config";

export default {
  components: { AdvancedSearchMenu, AdvancedSearchItemResult },
  data: () => ({
    form: {},
    value: "",
    selectedItem: null,
    isAdvancedSearchOpen: false,
    pageSizeSearch: pageSizeAdvancedSearch,
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
    "itemsLength",
  ],
  methods: {
    getValue(item) {
      return item && item.file && item.file.display ? item.file.display : "";
    },
    openAdvancedSearch() {
      this.isAdvancedSearchOpen = true;
      this.value = null;
    },
    closeAdvancedSearch() {
      this.isAdvancedSearchOpen = false;
    },
    openItemLocation(item) {
      this.onClearForm();
      this.$emit("openItemLocation", item);
    },
    onSelect(item) {
      this.onClearForm();
      this.$emit("select", item);
    },
    onEnter() {
      this.$emit("enter", this.value);
    },
    onInput(value) {
      this.selectedItem = null;
      this.value = value;
      this.onSearch(value);
    },
    onClickShowMoreResults() {
      this.value ? this.$emit("enter", this.value) : this.$emit("enter", JSON.stringify(this.form));
    },
    onClearForm() {
      this.form = {};
      this.selectedItem = null;
      this.$emit("clear");
    },
    updateForm(newForm) {
      this.form = removeEmptyValuesFromDict(newForm);

      // If the form isn't empty, create search request
      isDictEmpty(this.form) ? this.$emit("clear") : this.onSearch(JSON.stringify(this.form));
    },
    onSearch: debounce(function(value) {
      if (typeof value === "string" && value.length >= this.minLength) this.$emit("type", value);
      else if (!value || value.length === 0) this.$emit("clear");
    }, 500),
  },
  watch: {
    form: {
      handler(newForm) {
        this.updateForm(newForm);
      },
      deep: true,
    },
    items(newResults) {
      this.items = newResults;
    },
    value(newValue) {
      if (newValue) this.form = {};
      this.onInput(newValue);
    },
  },
};
</script>

<style scoped>
#no-result {
  padding-right: 20px;
}
</style>
