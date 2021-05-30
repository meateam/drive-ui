<template>
  <v-form>
    <div v-for="(item, index) in items" :key="index">
      <!-- text type -->
      <v-text-field
        v-if="item.type == typesFields.String"
        v-model="form[item.value]"
        :label="item.name"
        :prepend-icon="item.icon"
      />

      <!-- date range -->
      <v-menu
        v-else-if="item.type == typesFields.Date"
        ref="dateMenu"
        v-model="dateMenu"
        :close-on-content-click="false"
        :return-value.sync="form[item.value]"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :prepend-icon="item.icon"
            v-model="form[item.value]"
            :label="item.name"
            v-bind="attrs"
            v-on="on"
          >
          </v-text-field>
        </template>
        <v-date-picker range v-model="form[item.value]" no-title scrollable locale="he-IL">
          <div id="actions">
            <SubmitButton @click="dateMenu = false" label="Cancel" />
            <SubmitButton @click="save(form[item.value])" label="OK" />
          </div>
        </v-date-picker>
      </v-menu>

      <!-- owner field -->
      <!-- <AdvancedSearchOwnerField v-else-if="item.type == typesFields.User" /> -->
    </div>
  </v-form>
</template>

<script>
import SubmitButton from "@/components/buttons/BaseSubmitButton";
// import AdvancedSearchOwnerField from "@/components/layout/toolbar/search/AdvancedSearchOwnerField";
import { ItemsSeacrhTypesEnum } from "@/utils/itemsSearchEnum";

export default {
  name: "AdvancedSearchForm",
  props: ["items", "form", "disabled"],
  components: {
    SubmitButton,
  },
  data() {
    return {
      dateMenu: false,
      typesFields: ItemsSeacrhTypesEnum,
    };
  },
  methods: {
    save(time) {
      this.$refs.dateMenu[0].save(time);
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
