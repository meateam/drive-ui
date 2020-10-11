<template>
  <v-breadcrumbs :items="items" divider=">">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        id="breadcrumb"
        :class="{ page: page }"
        @click="$emit('click', item.value)"
        :disabled="item.disabled"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: ["items", "page"],
};
</script>

<style scoped>
#breadcrumb {
  cursor: pointer;
}
.page {
  font-size: 25px;
  color: #2c3448;
  font-family: Assistant-light;
  font-weight: 400;
}
</style>