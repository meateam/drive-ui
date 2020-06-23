<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" :src="require(`@/assets/icons/${img}`)" />
        <p class="d-title">{{$t(`${type}.Upload`)}}</p>
      </div>
      <div class="popup-body">
        <p class="d-subtitle">{{$t(`${type}.Name`)}}</p>
        <TextField
          @keyup.enter.native="onConfirm"
          @input="onNameChange"
          :placeholder="$t(`${type}.New`)"
        />
        <v-card-actions class="popup-confirm">
          <Confirm @click="onConfirm" :label="$t('buttons.Confirm')" />
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import TextField from "../inputs/TextField";
import Confirm from "../buttons/Confirm";

export default {
  name: "CreatePopup",
  components: { Confirm, TextField },
  data() {
    return {
      dialog: false,
      name: ""
    };
  },
  props: ["img", "type"],
  methods: {
    open() {
      this.dialog = true;
    },
    onNameChange(name) {
      this.name = name;
    },
    onConfirm() {
      this.dialog = false;
      this.$emit("confirm", this.name);
    }
  }
};
</script>

<style scoped>
</style>