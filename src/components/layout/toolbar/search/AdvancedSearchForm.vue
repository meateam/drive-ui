<template>
  <v-form>
    <div v-for="(item, index) in items" :key="index">
      <v-row justify="space-between">
        <v-col cols="6" md="1" class="mt-2" align="start">
          <div id="nameField">
            {{ item.name }}
          </div>
        </v-col>
        <v-col cols="7" md="9">
          <!-- text type -->
          <v-text-field v-if="item.type == typesFields.String" v-model="form[item.value]" :label="item.label" />

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
              <v-text-field v-model="form[item.value]" :label="item.name" v-bind="attrs" v-on="on" clearable>
              </v-text-field>
            </template>
            <v-date-picker range v-model="form[item.value]" reactive no-title scrollable locale="he-IL">
              <div id="actions">
                <SubmitButton @click="dateMenu = false" label="Cancel" />
                <SubmitButton @click="save(form[item.value])" label="OK" />
              </div>
            </v-date-picker>
          </v-menu>

          <!-- owner field -->
          <AdvancedSearchOwnerField
            v-else-if="item.type == typesFields.User"
            :placeholder="item.label"
            :value="item.value"
            @selectUser="selectUser"
            :reset="reset"
          />
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>

<script>
import SubmitButton from "@/components/buttons/BaseSubmitButton";
import AdvancedSearchOwnerField from "@/components/layout/toolbar/search/fields/AdvancedSearchOwnerField";
import { ItemsSeacrhTypesEnum } from "@/utils/itemsSearchEnum";

export default {
  name: "AdvancedSearchForm",
  props: ["items", "form", "disabled", "reset"],
  components: {
    SubmitButton,
    AdvancedSearchOwnerField,
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
    selectUser: function(user, item) {
      let tempform = this.form;
      if (tempform === undefined) tempform = {};
      tempform[item] = user;

      this.$emit("updateForm", tempform);
    },
  },
};
</script>

<style scoped>
.form-style > * {
  padding: 0%;
}
#actions {
  justify-content: center;
  padding-right: 30px;
}
#actions > * {
  max-height: 25px;
  font-size: medium;
}
#nameField {
  font-size: medium;
  width: 120px;
}
</style>
