<template>
  <v-autocomplete
    @input="$emit('input', value)"
    id="chips"
    v-model="value"
    :items="items"
    append-icon
    rounded
    filled
    chips
    multiple
    dense
    background-color="white"
    :label="placeholder"
  >
    <template v-slot:selection="data">
      <v-chip color="#357e6f" id="chip">
        <img id="user-icon" src="@/assets/icons/user.png" />
        <p>{{`${data.item.firstName} ${data.item.lastName ? data.item.lastName: ""}`}}</p>
        <v-btn icon color="white" @click="remove(data.item)">
          <v-icon id="close-icon">close</v-icon>
        </v-btn>
      </v-chip>
    </template>
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>{{ $t('autocomplete.NoResult')}}</v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:item="{ item }">
      <div>
        <p>{{`${item.firstName} ${item.lastName ? item.lastName: ""} > ${item.hierarchyFlat}`}}</p>
      </div>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  data: () => ({
    value: []
  }),
  props: ["placeholder", "items"],
  methods: {
    remove(item) {
      this.value = this.value.filter(user => {
        return user !== item;
      });
    }
  }
};
</script>

<style scoped>
#user-icon {
  width: 10px;
  margin-left: 5px;
}
#chip {
  margin-bottom: 9px;
  color: white;
}
#close-icon {
  font-size: 15px;
}
.v-btn--icon.v-size--default {
  width: 22px;
  margin-right: 5px;
  height: 22px;
}
</style>