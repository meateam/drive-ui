<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <img
          class="popup-icon auto-margin"
          :src="require(`@/assets/icons/${img}`)"
        />
        <p class="d-title">{{ $t(`${type}.Upload`) }}</p>
      </div>
      <div class="popup-body">
        <p class="d-subtitle">{{ $t(`${type}.Name`) }}</p>
        <TextField
          ref="input"
          @keyup.enter.native="onConfirm"
          @input="onNameChange"
          :placeholder="$t(`rename.New`)"
          :val="value"
        />
        <p v-if="isSpecialChars()" id="specialCharsMsg">
          {{ $t(`rename.SpecialChars`) }}
        </p>
        <v-card-actions class="popup-confirm">
          <SubmitButton
            @click="onConfirm"
            :label="$t('buttons.Confirm')"
            :disabled="isInvalidName()"
          />
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import TextField from "@/components/inputs/BaseTextField";
import SubmitButton from "@/components/buttons/BaseSubmitButton";
import { isValidString } from "@/utils/validateInput";

export default {
  name: "NamePopup",
  components: { SubmitButton, TextField },
  data() {
    return {
      dialog: false,
      name: "",
    };
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$store.commit('changePopupStatus')
      } 
    },
  },
  props: ["img", "type", "value"],
  methods: {
    isSpecialChars() {
      return !isValidString(this.name) && this.name !== "";
    },
    isInvalidName() {
      return this.name.length < 2 || !isValidString(this.name);
    },
    open() {
      if (!this.$store.getters.popupStatus) {
        this.$store.commit('changePopupStatus')
        this.dialog = true;
      }
    },
    onNameChange(name) {
      this.name = name;
    },
    onConfirm() {
      if (this.name.length >= 2) {
        this.$emit("confirm", this.name);
        this.dialog = false;
        this.$refs.input.clear();
        this.name = "";
      }
    },
  },
};
</script>

<style scoped>
#specialCharsMsg {
  position: absolute;
  color: red;
  margin-top: -10px;
}
</style>