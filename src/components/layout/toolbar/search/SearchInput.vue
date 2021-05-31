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
      @openItemLocation="openItemLocation"
      @type="getSearchResults"
      @clear="clearResults"
    />
  </div>
</template>

<script>
import Autocomplete from "@/components/layout/toolbar/search/SearchAutoComplete";
import { advancedSearch } from "@/api/search";
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

      let queryParsed = isJson(query);
      if (!queryParsed) queryParsed = { fileName: query };

      advancedSearch(queryParsed)
        .then((results) => {
          results.forEach((res) => (res.file.display = `${res.file.name}`));

          this.results = results.map((result) => result);
        })
        .finally(() => (this.isSearchLoading = false));
    },
    onEnter(query) {
      this.$router.push({ path: "/search", query: { q: query } });
    },
    openItemLocation(result) {
      this.$emit("openItemLocation", result);
    },
    onSelect(result) {
      this.$emit("onSelectItem", result);
    },
    clearResults() {
      this.results = [];
    },
  },
};
</script>

<style scope>
.v-autocomplete__content {
  max-height: none !important;
}
</style>
