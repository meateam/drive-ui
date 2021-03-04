<template>
  <v-radio-group row :background-color="background" v-model="selected" class="v-label">
    <v-layout row wrap>
      <v-flex v-for="(item, index) in items" :key="index" class="d-flex justify-space-between mb-3">
        <v-radio
          :label="item.label"
          :value="item.value"
          :color="item.color"
          @click="$emit('change', selected)"
        ></v-radio>
        <v-chip v-if="info != undefined" small color="#466567" outlined id="label-chip">
          {{ infoGenerator[index] }}
        </v-chip>
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
.v-label {
  width: 100% !important;
}
#label-chip {
  width: 6em;
  justify-content: center !important;
}
</style>
