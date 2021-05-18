<template>
  <v-sheet elevation="5" class="py-2 px-1">
    <v-chip-group
      v-model="selected"
      active-class="primary--text"
      :multiple="multiple ? true : false"
      :max="multiple && max ? max : undefined"
      show-arrows
      @change="onChange"
    >
      <v-chip v-for="(item, key) in items" :active="true" :filter="filter ? true : false" :key="key" :item="item">
        {{ item }}
      </v-chip>
    </v-chip-group>
  </v-sheet>
</template>

<script>
export default {
  name: 'ChipGroup',
  props: ['items', 'multiple', 'max', 'filter', 'value'],
  data() {
    return {
      selected: this.value,
      itemsKeys: Object.keys(this.items),
    };
  },
  methods: {
    onChange: function() {
      this.$emit('onChange', this.selected);
    },
  },
  watch: {
    value(value) {
      this.selected = value;
    },
  },
};
</script>
