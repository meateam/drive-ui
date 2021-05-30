<template>
  <v-autocomplete
    :search-input="value"
    :items="items"
    :placeholder="placeholder"
    :loading="isLoading"
    :background-color="background"
    @click="closeAdvancedSearch"
    @input="onSelect"
    @update:search-input="onInput"
    @keyup.enter.native="onEnter"
    v-model="item"
    rounded
    filled
    dense
    no-filter
    return-object
    item-text="display"
    color="#035c64"
  >
    <!-- item -->
    <template v-slot:item="{ item }">
      <AdvancedSearchItemResult :item="item" />
    </template>

    <!-- basic search -->
    <template v-slot:prepend-inner
      ><v-icon>{{ searchIcon }}</v-icon></template
    >

    <!-- advanced search -->
    <template v-slot:append>
      <v-btn v-if="value" small icon @click="onClearValue">
        <v-icon small>close</v-icon>
      </v-btn>
      <v-btn small icon @click="changeAdvancedSearch">
        <v-icon>{{ advancedSearchIcon }}</v-icon>
      </v-btn>
    </template>

    <!-- advanced search form -->
    <template v-if="openAdvancedSearch" v-slot:prepend-item>
      <AdvancedSearchMenu :form="form" @onClearForm="onClearForm" @onSearch="onSearch" />
      <v-divider></v-divider>
    </template>

    <!-- no data -->
    <template v-slot:no-data>
      <p v-if="!openAdvancedSearch" id="no-result">{{ $t(`autocomplete.${noResult || "NoResult"}`) }}</p>
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
    openAdvancedSearch: false,
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
    changeAdvancedSearch() {
      this.openAdvancedSearch = true;
    },
    closeAdvancedSearch() {
      this.openAdvancedSearch = false;
    },
    onSelect() {
      this.$emit("select", this.item.file ? this.item.file : this.item);
    },
    onEnter() {
      this.item = "";
      this.$emit("enter", this.value);
    },
    onInput(value) {
      this.value = value?.file ? value.file.name : value;
      this.onSearch(value);
    },
    onSearch: debounce(function(value) {
      if (typeof value === "string" && value.length >= this.minLength) this.$emit("type", value);
    }, 500),
    onClearForm() {
      this.form = {};
      this.$emit("clear");
    },
    onClearValue() {
      this.value = "";
      this.$emit("clear");
    },
  },
  watch: {
    form: {
      handler(newForm) {
        let tempForm = newForm;
        Object.keys(newForm).map((key) => {
          if (newForm[key] == "") delete tempForm[key];
        });
        this.form = tempForm;
        isDictEmpty(tempForm) ? this.$emit("clear") : this.onSearch(JSON.stringify(tempForm));
      },
      deep: true,
    },
    items(newResults) {
      this.items = newResults;
    },
  },
};
</script>

<style scoped>
#no-result {
  padding-right: 20px;
}
.disableInput {
  pointer-events: none;
}
</style>
