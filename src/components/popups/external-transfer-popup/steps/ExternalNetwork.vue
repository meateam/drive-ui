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
    <div v-if="isNetworkUnavailable()" id="network-unavailable-container">
      <p id="network-unavailable-text">{{$t("externalTransfer.DestinationUnavailable")}}</p>
      <v-btn text small @click="onMoreInfoClick" class="center">
        <p>{{ $t("buttons.MoreInfo") }}</p>
      </v-btn>
    </div>

    <v-card-actions class="popup-confirm">
      <SubmitButton @click="onConfirm" :label="$t('buttons.Continue')" :disabled="disabled" />
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getEnabledNetworks } from "@/utils/networkDest";

import SelectBtn from "@/components/inputs/BaseBtnSelect";
import SubmitButton from "@/components/buttons/BaseSubmitButton";

export default {
  name: "ExternalNetwork",
  components: { SubmitButton, SelectBtn },
  props: { reset: Boolean },
  computed: {
    ...mapGetters(["user", "externalNetworkDests", "dropboxSupportLink"]),
    enableNetworks: function() {
      return getEnabledNetworks();
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
    isNetworkUnavailable() {
      return this.externalNetworkDest && !this.user.approverInfos[this.externalNetworkDest];
    },
    onMoreInfoClick() {
      window.open(this.dropboxSupportLink);
    },
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
      if (this.isNetworkUnavailable()) {
        this.disabled = true;
      }
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
#network-unavailable-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
#network-unavailable-text {
  color: red;
  text-align: center;
}
</style>
