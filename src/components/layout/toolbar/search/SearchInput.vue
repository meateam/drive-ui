<template>
  <div>
    <Autocomplete
      background="#f0f4f7"
      searchIcon="search"
      advancedSearchIcon="expand_more"
      :placeholder="$t('autocomplete.Drive')"
      :minLength="1"
      :items="results"
      :isLoading="isSearchLoading"
      @select="onSelect"
      @enter="onEnter"
      @openItemLocation="openItemLocation"
      @type="getSearchResults"
      @clear="clearResults"
    />
  </div>
</template>

<script>
import Autocomplete from "@/components/layout/toolbar/search/SearchAutoComplete";
import { advancedSearch } from "@/api/search";

export default {
  name: "SearchInput",
  components: { Autocomplete },
  data() {
    return {
      results: [],
      isSearchLoading: false,
    };
  },
  methods: {
    openItemLocation(result) {
      this.$emit("openItemLocation", result);
    },
    onSelect(result) {
      this.$emit("onSelectItem", result);
    },
    getSearchResults(query) {
      if (this.isSearchLoading) return;
      this.isSearchLoading = true;

      advancedSearch(query, 0)
        .then((results) => {
          results.forEach((res) => (res.file.display = `${res.file.name}`));
          this.results = results.map((result) => result);
        })
        .finally(() => (this.isSearchLoading = false));
    },
    clearResults() {
      this.results = [];
    },
    onEnter(query) {
      // TODO: change
      this.$router.push({ path: "/search", query: { q: query } });
    },
  },
};
</script>
