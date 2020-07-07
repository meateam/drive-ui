<template>
  <v-card
    id="file"
    class="pointer"
    @dblclick="$emit('dblclick', $event, file)"
    @contextmenu.prevent="$emit('contextmenu', $event, file)"
  >
    <p id="file-name">{{file.name}}</p>
  </v-card>
</template>

<script>
export default {
  name: "File",
  props: ["file"]
};
</script>

<style scoped>
#file {
  min-width: 220px;
  position: relative;
  height: 185px;
  line-height: 50px;
  margin: 0 0 15px 15px;
}
#file-name {
  letter-spacing: 1px;
  position: absolute;
  bottom: 0;
  border-radius: 0;
  right: 0;
  height: 51px;
  border-top: solid 1px #dfe5eb;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.v-card {
  box-shadow: 0px 1px 6px 0 rgba(42, 87, 120, 0.1) !important;
  border-radius: 10px !important;
}
</style>