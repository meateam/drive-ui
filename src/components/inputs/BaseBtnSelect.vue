<template>
  <v-btn-toggle v-model="selected" @change="$emit('change', selected)">
    <template v-if="withToolTip">
      <v-tooltip top v-for="(item, index) in items" :key="index">
        <template v-slot:activator="{ on }">
          <v-btn elevation="2" :value="item.value" v-on="on">{{ item.label }}</v-btn>
        </template>
        <span>{{ labelGenerator[index] }}</span>
      </v-tooltip>
    </template>
    <v-btn v-else v-for="(item, index) in items" :value="item.value" :key="index">
      {{ item.label }}
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  name: "SelectBtn",
  props: ["items", "background", "withToolTip", "info", "reset"],
  data() {
    return {
      selected: null,
    };
  },
  watch: {
    reset(value) {
      this.selected = value;
    },
  },
  computed: {
    labelGenerator: function() {
      return this.$props.items.map((item) => {
        if (this.$props.info != undefined) {
          let infos = this.$props.info.map((attr) => item[attr].charAt(0).toUpperCase() + item[attr].slice(1));
          return infos.join("-");
        } else {
          return item.label;
        }
      });
    },
  },
};
</script>
