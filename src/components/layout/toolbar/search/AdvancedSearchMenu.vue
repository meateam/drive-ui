<template>
  <div class="text-center">
    <AdvancedSearchForm :form="form" :disabled="disabled" id="advancedSearchFilters" :items="searchFiltersOptions" />

    <div id="actions">
      <SubmitButton @click="getSearchResults()" :label="$t('header.AdvancedSearch')" />
      <SubmitButton @click="clearForm()" :label="$t('header.AdvancedSearchClear')" />
    </div>
  </div>
</template>

<script>
import AdvancedSearchForm from "@/components/layout/toolbar/search/AdvancedSearchForm";
import SubmitButton from "@/components/buttons/BaseSubmitButton";
import { GetTypeField, GetIconField } from "@/utils/itemsSearchEnum";

export default {
  name: "AdvancedSearchMenu",
  components: { AdvancedSearchForm, SubmitButton },
  props: ["form"],
  data() {
    return {
      disabled: true,
      advancedSearchOptions: this.$t("header.AdvancedSearchChoices"),
    };
  },
  methods: {
    getSearchResults() {
      this.$emit("moreResults");
    },
    getFieldObject(filterKey) {
      let fieldObject = {};

      fieldObject.value = filterKey;
      fieldObject.name = this.advancedSearchOptions[filterKey];
      fieldObject.icon = GetIconField(filterKey);
      fieldObject.type = GetTypeField(filterKey);
      return fieldObject;
    },
    clearForm() {
      this.$emit("onClearForm");
    },
  },
  computed: {
    searchFiltersOptions: function() {
      return Object.keys(this.advancedSearchOptions).map((filterKey) => this.getFieldObject(filterKey));
    },
  },
};
</script>

<style scoped>
#actions {
  justify-content: center;
  padding: 20px;
}
#actions > * {
  max-height: 25px;
  font-size: medium;
}
#advancedSearchFilters {
  width: 400px;
  padding-right: 30px;
}
</style>
