<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn large color="#035c64" id="button-search" class="white--text" v-bind="attrs" v-on="on">
          {{ $t('header.AdvancedSearch') }}
        </v-btn>
      </template>

      <v-card>
        <v-list id="advancedSearchButtons">
          <v-list-item>
            <AdvancedSearchOptions
              :value="searchFilters"
              :items="advancedSearchOptions"
              :multiple="true"
              :filter="true"
              :max="2"
              @onChange="onChangeFilter"
            />
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item-title>{{ $t('header.AdvancedSearchOptions') }}</v-list-item-title>
          <AdvancedSearchFields
            :form="form"
            :disabled="disabled"
            id="advancedSearchFilters"
            :items="searchFilters.map((filter) => getFieldObject(filter))"
          />
        </v-list>
        <v-divider></v-divider>

        <v-card-actions id="actions">
          <SubmitButton @click="getSearchResults()" :label="$t('header.AdvancedSearch')" :disabled="disabled" />
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import AdvancedSearchOptions from '@/components/layout/toolbar/search/AdvancedSearchOptions';
import AdvancedSearchFields from '@/components/layout/toolbar/search/AdvancedSearchFields';
import SubmitButton from '@/components/buttons/BaseSubmitButton';
import { ItemsSearchEnum, GetTypeField } from '@/utils/itemsSearchEnum';

export default {
  name: 'AdvancedSearchMenu',
  components: { AdvancedSearchOptions, AdvancedSearchFields, SubmitButton },
  props: ['searchFilters', 'searchType'],
  data() {
    return {
      form: {},
      menu: false,
      checkbox: false,
      disabled: true,
      advancedSearchOptions: this.$t('header.AdvancedSearchChoices'),
    };
  },
  methods: {
    getSearchResults() {
      this.searchType = ItemsSearchEnum.AdvancedSearch;
      this.$emit('search', this.form);
    },
    onChangeFilter(filter) {
      this.searchFilters = filter;
      Object.keys(this.form).map((key) => {
        if (!this.searchFilters.includes(key)) {
          this.form[key] = undefined;
          this.disabled = true;
        }
      });
    },
    getNameFilter(filterIndex) {
      return Object.keys(this.advancedSearchOptions)[filterIndex];
    },
    getFieldObject(filterIndex) {
      let fieldObject = {};
      fieldObject.value = Object.keys(this.advancedSearchOptions)[filterIndex];
      fieldObject.name = this.advancedSearchOptions[fieldObject.value];
      fieldObject.type = GetTypeField(fieldObject.value);
      return fieldObject;
    },
  },
  watch: {
    form(newValue) {
      this.form = newValue;
      if (this.searchFilters.length > 0) {
        let valid = true;
        this.searchFilters.map((searchFilter) => {
          if (newValue[searchFilter] != undefined && newValue[searchFilter].length > 0) valid = false;
        });

        this.disabled = !valid;
      } else {
        this.disabled = true;
      }
    },
    menu(newValue) {
      if (!newValue) this.searchFilters = [];
      this.form = {};
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
  width: 350px;
  padding-right: 30px;
}
</style>
