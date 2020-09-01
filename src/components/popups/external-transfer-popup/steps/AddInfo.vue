<template>
  <div>
    <p class="popup-text">{{$t('externalTransfer.MoreInfo')}}</p>
    <Textarea @input="onInfoChange" :placeholder="$t('externalTransfer.Describe')" />
    <div class="space-between">
      <div class="select-container">
        <Select
          :items="classifications"
          background="transparent"
          @change="onClassificationChange"
          :placeholder="$t('externalTransfer.ChooseClassification')"
        />
      </div>

      <v-card-actions class="popup-confirm">
        <SubmitButton @click="onConfirm" :label="$t('buttons.Continue')" :disabled="disabled" />
        <TextButton @click="$emit('back')" :label="$t('buttons.Back')" />
      </v-card-actions>
    </div>
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
      classifications: this.$t("externalTransfer.Classifications")
    };
  },
  methods: {
    onConfirm() {
      this.$emit("continue", this.info, this.classification);
    },
    onInfoChange(value) {
      this.info = value;
      this.info && this.classification
        ? (this.disabled = false)
        : (this.disabled = true);
    },
    onClassificationChange(value) {
      this.classification = value;
      this.info && this.classification
        ? (this.disabled = false)
        : (this.disabled = true);
    }
  }
};
</script>
