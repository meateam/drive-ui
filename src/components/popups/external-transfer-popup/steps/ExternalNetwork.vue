<template>
  <div>
    <p class="popup-text">{{ $t("externalTransfer.NetworkDestChoose") }}</p>

    <div v-bind:class="[enableNetworks.length == 1 ? 'mx-auto select-btn-one' : 'select-btn', 'select-container']">
      <SelectBtn
        :items="enableNetworks"
        background="transparent"
        withToolTip="true"
        :info="['appID']"
        @change="onExternalNetworkDestChange"
        :reset="reset"
      />
    </div>

    <v-card-actions class="popup-confirm">
      <SubmitButton @click="onConfirm" :label="$t('buttons.Continue')" :disabled="disabled" />
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import SelectBtn from "@/components/inputs/BaseBtnSelect";
import SubmitButton from "@/components/buttons/BaseSubmitButton";

export default {
  name: "ExternalNetwork",
  components: { SubmitButton, SelectBtn },
  props: { reset: Boolean },
  computed: {
    ...mapGetters(["externalNetworkDests"]),
    enableNetworks: function() {
      return this.externalNetworkDests.filter((networkDest) => networkDest.isEnabled);
    },
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
.select-btn {
  width: 200px;
  margin: 15px;
}
.select-btn-one {
  padding-right: 15px;
  margin: 15px;
}
.top-secret {
  padding-top: 10px;
  color: red;
}
</style>
