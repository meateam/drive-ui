<template>
  <div>
    <p class="popup-text">{{ $t("externalTransfer.MoreInfo") }}</p>
    <Textarea
      :reset="resetInfo"
      @input="onInfoChange"
      :placeholder="$t('externalTransfer.Describe')"
    />
    <div class="space-between">
      <div class="select-container">
        <Select
          :reset="resetSelect"
          :items="classifications"
          background="transparent"
          @change="onClassificationChange"
          :placeholder="$t('externalTransfer.ChooseClassification')"
        />
      </div>
      <p v-if="classification === 'סודי ביותר'" class="top-secret">
        {{ $t("externalTransfer.TopSecret") }}
      </p>
    </div>

    <v-card-actions class="popup-confirm">
      <SubmitButton
        @click="onConfirm"
        :label="$t('buttons.Continue')"
        :disabled="disabled"
      />
      <TextButton @click="$emit('back')" :label="$t('buttons.Back')" />
    </v-card-actions>
  </div>
</template>

<script>
import Textarea from "@/components/inputs/BaseTextarea";
import Select from "@/components/inputs/BaseSelect";
import TextButton from "@/components/buttons/BaseTextButton";
import SubmitButton from "@/components/buttons/BaseSubmitButton";

export default {
  name: "AddInfo",
  components: { Textarea, SubmitButton, Select, TextButton },
  data() {
    return {
      info: "",
      classification: undefined,
      disabled: true,
      classifications: this.$t("externalTransfer.Classifications"),
      resetSelect: null,
      resetInfo: null,
    };
  },
  props: {
    reset: Boolean,
  },
  watch: {
    reset() {
      this.resetSelect = null;
      this.resetInfo = null;
      this.disabled = true;
    },
  },
  methods: {
    onConfirm() {
      this.$emit("continue", this.info, this.classification);
    },
    onInfoChange(value) {
      this.info = value;
      this.resetInfo = value;
      this.toggleDisabled();
    },
    onClassificationChange(value) {
      this.classification = value;
      this.resetSelect = value;
      this.toggleDisabled();
    },
    toggleDisabled() {
      this.info && this.classification && this.classification !== "סודי ביותר"
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