<template>
  <div class="text-center">
    <AdvancedSearchForm
      :form="form"
      :disabled="disabled"
      id="advancedSearchFilters"
      :items="searchFiltersOptions"
      :reset="reset"
      @updateForm="updateForm"
    />

    <div id="actions">
      <v-checkbox v-model="exactMatch" :label="$t('header.AdvancedSearchExactMatch')" />

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
      exactMatch: false,
      reset: false,
      disabled: true,
      advancedSearchOptions: this.$t("header.AdvancedSearchChoices"),
    };
  },
  watch: {
    exactMatch(newVal) {
      this.form["exactMatch"] = newVal;
      this.updateForm(this.form);
    },
  },
  methods: {
    getSearchResults() {
      this.$emit("moreResults");
    },
    getFieldObject(filterKey) {
      return {
        value: filterKey,
        name: this.advancedSearchOptions[filterKey].name,
        label: this.advancedSearchOptions[filterKey].label,
        icon: GetIconField(filterKey),
        type: GetTypeField(filterKey),
      };
    },
    clearForm() {
      this.reset = !this.reset;
      this.$emit("onClearForm");
    },
    updateForm(newForm) {
      this.$emit("updateForm", newForm);
    },
  },
  computed: {
    searchFiltersOptions: function() {
      return Object.keys(this.advancedSearchOptions).map(this.getFieldObject);
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
  width: 600px;
  padding-right: 30px;
}
</style>
