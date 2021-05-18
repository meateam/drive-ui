<template>
  <v-autocomplete
    v-model="item"
    @input="onSelect"
    @update:search-input="onInput"
    @keyup.enter.native="onEnter"
    :items="items"
    :placeholder="placeholder"
    :loading="isLoading"
    rounded
    filled
    dense
    hide-details
    no-filter
    item-text="display"
    return-object
    color="#035c64"
    :background-color="background"
    :class="{ disableInput: disabled }"
  >
    <!-- basic search -->
    <template v-slot:prepend-inner
      ><v-icon>{{ searchIcon }}</v-icon></template
    >

    <!-- advanced search -->
    <template v-slot:append>
      <v-btn small icon @click="changeAdvancedSearch">
        <v-icon>{{ advancedSearchIcon }}</v-icon>
      </v-btn>
    </template>

    <!-- advanced search form -->
    <template v-if="openAdvancedSearch" v-slot:append-item>ffddf</template>

    <!-- no data -->
    <template v-slot:no-data>
      <p v-if="!openAdvancedSearch" id="no-resault">{{ $t(`autocomplete.${noResult || 'NoResult'}`) }}</p>
      <p v-else>{{ $t('header.AdvancedSearch') }}</p>
    </template>
  </v-autocomplete>
</template>

<script>
import debounce from 'lodash/debounce';

export default {
  data: () => ({
    item: null,
    value: '',
    openAdvancedSearch: false,
    items: [],
    // items: [
    //   {
    //     id: '6093d57a3266db0012a58a57',
    //     display: 'kd (1).config',
    //     name: 'kd (1).config',
    //     type: 'application/octet-stream',
    //     size: 8976,
    //     ownerId: '5e5688324203fc40043591aa',
    //     createdAt: 1620301178109,
    //     updatedAt: 1620301178109,
    //     role: 'OWNER',
    //     shared: false,
    //     isExternal: false,
    //     appID: 'drive',
    //   },
    //   {
    //     id: '6093d4b73266db0012a58a53',
    //     display: 'kd (2).config',
    //     name: 'kd (2).config',
    //     type: 'application/octet-stream',
    //     size: 8976,
    //     ownerId: '5e5688324203fc40043591aa',
    //     createdAt: 1620300983371,
    //     updatedAt: 1620300983371,
    //     role: 'OWNER',
    //     shared: false,
    //     isExternal: false,
    //     appID: 'drive',
    //   },
    // ],
  }),
  props: [
    'searchIcon',
    'advancedSearchIcon',
    'placeholder',
    'background',
    'isLoading',
    'minLength',
    'noResult',
    'disabled',
  ],
  methods: {
    changeAdvancedSearch() {
      this.openAdvancedSearch = !this.openAdvancedSearch;
    },
    onSelect() {
      this.$emit('select', this.item);
    },
    onEnter() {
      this.item = '';
      this.$emit('enter', this.value);
    },
    onInput(value) {
      this.value = value;
      this.onSearch(value);
    },
    onSearch: debounce(function(value) {
      if (typeof value === 'string' && value.length >= this.minLength) this.$emit('type', value);
    }, 500),
  },
};
</script>

<style scoped>
#no-resault {
  padding-right: 20px;
}
.disableInput {
  pointer-events: none;
}
</style>
