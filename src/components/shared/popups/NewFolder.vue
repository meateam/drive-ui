<template>
  <v-dialog v-model="dialog" id="folder-dialog">
    <v-card>
      <div id="popup-header">
        <v-card-title class="headline">Use Google's location service?</v-card-title>
      </div>
      <div id="popup-body">
        <v-card-actions id="actions">
          <Confirm />
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import Confirm from "../buttons/Confirm";

export default {
  props: ["dialog"],
  components: { Confirm }
};
</script>

<style scoped>
#folder-dialog {
  width: 720px;
  height: 649px;
  border-radius: 10px;
  position: relative;
}
#popup-header {
  height: 457px;
  background-color: #ffffff;
  width: 100%;
}
#popup-body {
  background-color: #f0f4f7;
  height: 100%;
  width: 100%;
}
#actions {
  position: absolute;
  bottom: 50px;
  left: 50px;
}
</style>