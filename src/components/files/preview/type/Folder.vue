<template>
  <v-card
    id="folder"
    class="pointer"
    @dblclick="$emit('dblclick', $event, folder)"
    @contextmenu.prevent="$emit('contextmenu', $event, folder)"
  >
    <div class="flex">
      <v-icon color="#9caec4" id="folder-icon">folder</v-icon>
      <p id="folder-name">{{folder.name}}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Folder",
  props: ["folder"]
};
</script>

<style scoped>
#folder {
  min-width: 220px;
  height: 50px;
  line-height: 50px;
  margin: 0 0 15px 15px;
}
#folder-name {
  letter-spacing: 1px;
  font-size: 18px;
}
#folder-icon {
  margin: auto 10px;
}
.v-card {
  box-shadow: 0px 1px 6px 0 rgba(42, 87, 120, 0.1) !important;
  border-radius: 10px !important;
}
</style>