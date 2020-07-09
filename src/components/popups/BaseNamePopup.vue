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
          ref="input"
          @keyup.enter.native="onConfirm"
          @input="onNameChange"
          :placeholder="$t(`${type}.New`)"
        />
        <v-card-actions class="popup-confirm">
          <SubmitButton
            @click="onConfirm"
            :label="$t('buttons.Confirm')"
            :disabled="name.length<2"
          />
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import TextField from "@/components/inputs/BaseTextField";
import SubmitButton from "@/components/buttons/BaseSubmitButton";

export default {
  name: "NamePopup",
  components: { SubmitButton, TextField },
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
      if (this.$tours["tour"].currentStep === 5) {
        this.$tours["tour"].nextStep();
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
    }
  }
};
</script>

<style scoped>
</style>