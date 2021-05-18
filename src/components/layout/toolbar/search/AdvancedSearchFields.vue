<template>
  <!-- <v-form> -->
  <div>
    <div v-for="(item, index) in items" :key="index">
      <v-text-field v-if="item.type == 'string'" v-model="form[item.value]" :label="item.name" />

      <v-menu
        v-else-if="item.type == 'date'"
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="form[item.value]"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="form[item.value]" :label="item.name" v-bind="attrs" v-on="on"> </v-text-field>
        </template>
        <v-date-picker range v-model="form[item.value]" no-title scrollable>
          <div id="actions">
            <SubmitButton @click="menu = false" label="Cancel" />
            <SubmitButton @click="save(form[item.value])" label="OK" />
          </div>
        </v-date-picker>
      </v-menu>
    </div>
  </div>
  <!-- </v-form> -->
</template>

<script>
import SubmitButton from '@/components/buttons/BaseSubmitButton';

export default {
  name: 'AdvancedSearchFields',
  props: ['items', 'form', 'disabled'],
  components: {
    SubmitButton,
  },
  data() {
    return {
      menu: false,
    };
  },
  methods: {
    save(time) {
      this.$refs.menu[0].save(time);
    },
  },
};
</script>
<style scoped>
#actions {
  justify-content: center;
  padding-right: 30px;
}
#actions > * {
  max-height: 25px;
  font-size: medium;
}
</style>
