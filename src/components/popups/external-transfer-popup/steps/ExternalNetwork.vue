<template>
  <div>
    <p class="popup-text">{{ $t("externalTransfer.NetworkDestChoose") }}</p>

    <div class="select-container">
      <RadioButton
        :items="externalNetworkDests"
        background="transparent"
        @change="onExternalNetworkDestChange"
        :placeholder="$t('externalTransfer.NetworkDestChoose')"
      />
    </div>

    <v-card-actions class="popup-confirm">
      <SubmitButton
        @click="onConfirm"
        :label="$t('buttons.Continue')"
        :disabled="disabled"
      />
    </v-card-actions>
  </div>
</template>

<script>
import RadioButton from "@/components/inputs/BaseRadioButton";
import SubmitButton from "@/components/buttons/BaseSubmitButton";

export default {
  name: "ExternalNetwork",
  components: { SubmitButton, RadioButton },
  data() {
    return {
      externalNetworkDest: undefined,
      disabled: true,
      externalNetworkDests: this.$t("externalTransfer.ExternalNetworkDests"),
    };
  },
  methods: {
    onConfirm() {
      this.$emit("continue", this.externalNetworkDest);
    },
    onExternalNetworkDestChange(value) {
      this.externalNetworkDest = value;
      this.toggleDisabled();
    },
    toggleDisabled() {
      this.externalNetworkDest
        ? (this.disabled = false)
        : (this.disabled = true);
    },
  },
};
</script>

<style scoped>
.top-secret {
  padding-top: 10px;
  color: red;
}
</style>
