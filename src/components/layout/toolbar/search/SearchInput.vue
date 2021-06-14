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
      :itemsLength="resultsLength"
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
import { isFolder } from "@/utils/isFolder";

export default {
  name: "SearchInput",
  components: { Autocomplete },
  data() {
    return {
      results: [],
      resultsLength: 0,
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
          results.files.forEach((res) => (res.file.display = `${res.file.name}`));

          // Return the folders first
          results.files.sort((firstItem, secItem) => (isFolder(secItem) && !isFolder(firstItem) ? 1 : -1));
          this.results = results.files.map((result) => result);
          this.resultsLength = results.count;
        })
        .finally(() => (this.isSearchLoading = false));
    },
    clearResults() {
      this.results = [];
      this.resultsLength = 0;
    },
    onEnter(query) {
      this.$router.push({ path: "/search", query: { q: query } });
    },
  },
};
</script>
