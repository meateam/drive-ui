<template>
  <div>
    <p class="popup-text">{{ $t("externalTransfer.NetworkDestChoose") }}</p>

    <div class="select-container">
      <RadioButton
        :items="externalNetworkDests"
        background="transparent"
        :info="['appID']"
        @change="onExternalNetworkDestChange"
        :reset="reset"
        :placeholder="$t('externalTransfer.NetworkDestChoose')"
      />
    </div>

    <v-card-actions class="popup-confirm">
      <SubmitButton @click="onConfirm" :label="$t('buttons.Continue')" :disabled="disabled" />
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import RadioButton from "@/components/inputs/BaseRadioButton";
import SubmitButton from "@/components/buttons/BaseSubmitButton";

export default {
  name: "ExternalNetwork",
  components: { SubmitButton, RadioButton },
  props: { reset: Boolean },
  computed: {
    ...mapGetters(["externalNetworkDests"]),
  },
  data() {
    return {
      externalNetworkDest: undefined,
      disabled: true,
    };
  },
  watch: {
    reset() {
      this.externalNetworkDest = undefined;
      this.disabled = true;
    },
  },
  methods: {
    onConfirm() {
      this.$emit("continue", this.externalNetworkDest);
    },
    onExternalNetworkDestChange(value) {
      this.externalNetworkDest = value;
      this.toggleDisabled();

      this.$emit("change", value);
    },
    toggleDisabled() {
      this.externalNetworkDest ? (this.disabled = false) : (this.disabled = true);
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
