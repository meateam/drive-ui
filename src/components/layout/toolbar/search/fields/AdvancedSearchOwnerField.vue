<template>
  <div class="space-between">
    <v-select
      class="selectOptions"
      background-color="white"
      rounded
      :label="$t('externalTransfer.SearchBy')"
      dense
      v-model="advancedSearchSelection"
      :items="advancedSearchOptions"
    >
    </v-select>
    <Autocomplete
      icon
      background="white"
      :placeholder="placeholderSearch"
      :items="users"
      :isLoading="isLoading"
      :minLength="2"
      :noResult="'NoResultAdvancedSearch'"
      :validation="advancedSearchValidation()"
      @select="onUserSelect"
      @type="getUsersByContent"
      @clearItems="clearItems"
      width="290px"
    />
  </div>
</template>

<script>
import * as usersApi from "@/api/users";
import Autocomplete from "@/components/layout/toolbar/search/fields/UserAutocomplete";
import { AdvancedSearchToEnum } from "@/utils/convertAdvancedSearchToEnum";
import { AdvancedSearchEnum } from "@/utils/advancedSearchEnum";
import { validationAdvancedSearchFactory } from "@/utils/advancedSearchValidation";

export default {
  name: "Select",
  props: ["items", "background", "value", "reset", "placeholder"],
  components: {
    Autocomplete,
  },
  data() {
    return {
      users: [],
      isLoading: false,
      advancedSearchSelection: null,
      advancedSearchOptions: Object.entries(this.$t("header.AdvancedSearchUserChoices")).map((choice) => ({
        text: choice[1],
        value: choice[0],
      })),
      placeholderSearch: "",
    };
  },
  created() {
    this.advancedSearchSelection = this.advancedSearchOptions[0].value;
    this.placeholderSearch = this.$t("header.AdvancedSearchUserPlaceholder", {
      field: this.advancedSearchSelection.value,
    });
  },
  methods: {
    getUsersByContent(content) {
      if (this.isLoading) return;
      this.isLoading = true;
      const searchBy = !this.advancedSearchSelection
        ? AdvancedSearchEnum.SearchByName
        : AdvancedSearchToEnum(this.advancedSearchSelection);
      usersApi
        .getUsers(content, searchBy)
        .then((users) => (this.users = users))
        .finally(() => (this.isLoading = false));
    },
    onUserSelect(user) {
      this.$emit("selectUser", user ? user : "", this.value);
    },
    advancedSearchValidation() {
      return validationAdvancedSearchFactory(AdvancedSearchToEnum(this.advancedSearchSelection));
    },
    clearItems() {
      this.users = [];
    },
  },
  watch: {
    reset() {
      this.advancedSearchSelection = null;
      this.clearItems();
    },
    advancedSearchSelection(newval) {
      this.placeholderSearch = newval
        ? this.$t("header.AdvancedSearchUserPlaceholder", {
            field: this.$t(`header.AdvancedSearchUserChoices.${newval}`),
          })
        : this.$t("header.AdvancedSearchUserPlaceholder", {
            field: this.$t(`header.AdvancedSearchUserChoices.${this.advancedSearchOptions[0].value}`),
          });
    },
  },
};
</script>

<style scoped>
.selectOptions {
  width: 150px;
}
.v-select__slot {
  width: 100px;
}
</style>
