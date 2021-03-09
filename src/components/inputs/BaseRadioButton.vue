<template>
  <v-radio-group style="min-width: 200px" row :background-color="background" v-model="selected">
    <v-flex v-for="(item, index) in items" :key="index" class="mb-3">
      <v-radio :value="item.value" :color="item.color" @click="$emit('change', selected)">
        <template v-slot:label>
          <div>{{ labelGenerator[index] }}</div>
        </template>
      </v-radio>
    </v-flex>
  </v-radio-group>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    items: {
      type: Array,
    },
    background: {
      type: String,
    },
    reset: {
      type: Boolean,
    },
    info: {
      type: Array,
    },
  },
  watch: {
    reset() {
      this.selected = null;
    },
  },
  computed: {
    labelGenerator: function() {
      return this.$props.items.map((item) => {
        let infos = [];

        if (this.$props.info != undefined) {
          infos.push(item.label);
          this.$props.info.map((attr) => infos.push(item[attr]));

          return infos.join("-");
        } else {
          return item.label;
        }
      });
    },
  },
  data() {
    return {
      selected: null,
    };
  },
};
</script>
