<template>
  <v-radio-group row :background-color="background" v-model="selected">
    <v-layout row wrap>
      <v-flex column v-for="(item, index) in items" :key="index">
        <v-radio
          :label="item.label"
          :value="item.value"
          :color="item.color"
          @click="$emit('change', selected)"
        ></v-radio>
        <v-chip class="ma-2" small disabled dark> {{ infoGenerator[index] }} </v-chip>
      </v-flex>
    </v-layout>
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
    infoGenerator: function() {
      return this.$props.items.map((item) => {
        console.log("eejejej");
        if (this.$props.info != undefined) {
          let infos = [];
          this.$props.info.map((attr) => {
            infos.push(item[attr]);
          });

          return infos.join("-");
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

<style scoped>
v-input__control {
  width: 100% !important;
}
.v-label {
  width: 100% !important;
}
</style>
