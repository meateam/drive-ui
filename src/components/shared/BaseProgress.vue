<template>
  <v-progress-circular
    id="loading"
    v-if="show"
    :size="size"
    :width="3"
    :color="color"
    indeterminate
  ></v-progress-circular>
</template>

<script>
export default {
  name: "Progress",
  props: ["show", "color", "size"],
};
</script>

<style scoped>
#loading {
  margin: auto 15px;
}
</style>