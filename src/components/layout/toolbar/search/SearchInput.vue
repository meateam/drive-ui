<template>
  <div>
    <div class="space-between">
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
      />
    </div>
    <div v-if="false" id="advancedSearchContainer">
      <div id="advancedSearchTitlesContainer">
        <a id="advancedSearch" @click="onAdvancedSearch">{{ $t('header.AdvancedSearch') }}</a>
        <AdvancedSearchChips
          v-for="searchFilter in searchFilters"
          :key="searchFilter"
          :searchBy="$t(`header.AdvancedSearchChoices.${getNameFilter(searchFilter)}`)"
          @remove="onRemoveAdvancedSearch(searchFilter)"
        />
      </div>
      <div v-if="displayAdvancedSearchOptions" id="advancedSearchButtons">
        <SearchChipsGroup
          :value="searchFilters"
          :items="advancedSearchOptions"
          :multiple="true"
          :filter="true"
          :max="2"
          @onChange="onChangeFilter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Autocomplete from '@/components/layout/toolbar/search/SearchAutoComplete';
import AdvancedSearchChips from '@/components/shared/AdvancedSearchChips';
import SearchChipsGroup from '@/components/layout/toolbar/search/SearchChipsGroup';
import { ItemsSearchEnum } from '@/utils/itemsSearchEnum';
import { advancedSearch } from '@/api/search';

export default {
  name: 'SearchInput',
  components: { Autocomplete, AdvancedSearchChips, SearchChipsGroup },
  data() {
    return {
      results: [],
      isSearchLoading: false,
      searchType: ItemsSearchEnum.DefaultSearch,
      searchFilters: [],
      advancedSearchOptions: this.$t('header.AdvancedSearchChoices'),
      displayAdvancedSearchOptions: false,
    };
  },
  methods: {
    getSearchResults(query) {
      if (this.isSearchLoading) return;
      this.isSearchLoading = true;
      console.log(this.searchType);
      // if (this.searchType == ItemsSearchEnum.DefaultSearch) {
      //   search(query)
      //     .then((results) => {
      //       results.forEach((res) => (res.display = `${res.name}`));
      //       this.results = results;
      //     })
      //     .finally(() => (this.isSearchLoading = false));
      // } else {
      advancedSearch(query)
        .then((results) => {
          results.forEach((res) => (res.file.display = `${res.file.name}`));

          this.results = results.map((result) => result.file);
        })
        .finally(() => (this.isSearchLoading = false));
      // }
    },
    onEnter(query) {
      this.$router.push({ path: '/search', query: { q: query } });
    },
    onSelect(result) {
      this.$emit('onSelectItem', result);
    },
    onRemoveAdvancedSearch(item) {
      this.searchFilters = this.searchFilters.filter((filter) => filter != item);
    },
    onAdvancedSearch() {
      this.displayAdvancedSearchOptions = !this.displayAdvancedSearchOptions;
    },
    hideAdvancedSearchOptions() {
      this.displayAdvancedSearchOptions = false;
    },
    onChangeFilter(filter) {
      this.searchFilters = filter;
    },
    getSearchType() {
      return this.searchFilters && this.searchFilters.length > 0
        ? ItemsSearchEnum.AdvancedSearch
        : ItemsSearchEnum.DefaultSearch;
    },
    getNameFilter(filterIndex) {
      return Object.keys(this.advancedSearchOptions)[filterIndex];
    },
  },
  watch: {
    searchType(newValue) {
      this.searchType = newValue;
    },
  },
};
</script>

<style>
#button-search {
  max-height: 39px;
}
#advancedSearchTitlesContainer > * {
  display: inline-block;
}
#advancedSearchButtons {
  /* margin-right: 20px;
  padding-top: 5px; */
  justify-content: center;
  width: 380px;
}
#advancedSearch {
  width: max-content;
  font-size: smaller;
  color: #1976d2 !important;
  text-decoration: underline;
  margin-right: 15px;
}
</style>
