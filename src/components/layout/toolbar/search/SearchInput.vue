<template>
  <div>
    <Autocomplete
      background="#f0f4f7"
      :placeholder="$t('autocomplete.Drive')"
      searchIcon="search"
      advancedSearchIcon="expand_more"
      :minLength="0"
      :items="results"
      :isLoading="isSearchLoading"
      @select="onSelect"
      @enter="onEnter"
      @type="getSearchResults"
      @clear="clearResults"
    />
  </div>
</template>

<script>
import Autocomplete from "@/components/layout/toolbar/search/SearchAutoComplete";
import { search, advancedSearch } from "@/api/search";
import { isJson } from "@/utils/isJson";

export default {
  name: "SearchInput",
  components: { Autocomplete },
  data() {
    return {
      results: [],
      advancedSearchOptions: this.$t("header.AdvancedSearchChoices"),
      isSearchLoading: false,
    };
  },
  methods: {
    getSearchResults(query) {
      if (this.isSearchLoading) return;
      this.isSearchLoading = true;

      const queryParsed = isJson(query);
      if (!queryParsed) {
        search(query)
          .then((results) => {
            results.forEach((res) => (res.display = `${res.name}`));
            this.results = results;
          })
          .finally(() => (this.isSearchLoading = false));
      } else {
        advancedSearch(queryParsed)
          .then((results) => {
            results.forEach((res) => (res.file.display = `${res.file.name}`));

            this.results = results.map((result) => result);
          })
          .finally(() => (this.isSearchLoading = false));
      }
    },
    onEnter(query) {
      this.$router.push({ path: "/search", query: { q: query } });
    },
    onSelect(result) {
      this.$emit("onSelectItem", result);
    },
    clearResults() {
      setTimeout(() => {
        this.results = [];
      }, 500);
    },
  },
};
</script>

<style scope>
.v-autocomplete__content {
  max-height: none !important;
}
</style>
