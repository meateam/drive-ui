<template>
  <v-card
    id="folder"
    class="pointer"
    :class="{selected: isSelected}"
    @dblclick="$emit('dblclick', $event, folder)"
    @click.native.exact="$emit('click', $event, folder)"
    @click.ctrl.native="$emit('ctrlclick', $event, folder)"
    @contextmenu.prevent="$emit('contextmenu', $event, folder)"
  >
    <v-icon color="#fc8946" id="folder-icon">folder</v-icon>
    <p id="folder-name">{{folder.name}}</p>
  </v-card>
</template>

<script>
export default {
  name: "Folder",
  props: ["folder", "isSelected"]
};
</script>

<style scoped>
#folder {
  width: 220px;
  height: 50px;
  display: flex;
  line-height: 50px;
  box-shadow: 0px 1px 6px 0 rgba(42, 87, 120, 0.1);
  border-radius: 10px;
  margin: 0 0 15px 15px;
}
.selected {
  box-shadow: 0px 30px 38px 0 rgba(54, 116, 163, 0.21) !important;
}
#folder-name {
  letter-spacing: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
}
#folder-icon {
  margin: auto 10px;
}
</style>