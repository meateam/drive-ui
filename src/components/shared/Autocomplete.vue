<template>
  <v-autocomplete
    v-model="value"
    :items="items"
    rounded
    filled
    dense
    append-icon="search"
    background-color="#f0f4f7"
    :placeholder="$t('autocomplete.Placeholder')"
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>{{ $t('autocomplete.NoResult')}}</v-list-item-title>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  data: () => ({
    value: null,
    items: []
  })
};
</script>