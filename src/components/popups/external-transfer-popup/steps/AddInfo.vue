<template>
  <div>
    <p class="popup-text">{{ $t("externalTransfer.MoreInfo") }}</p>
    <Textarea :reset="resetInfo" @input="onInfoChange" :placeholder="$t('externalTransfer.Describe')" />
    <div class="space-between">
      <div :class="[classification && classification.length < 10 ? 'select-classfier' : 'select-classfier-max']">
        <Select
          :reset="resetSelect"
          :items="classifications"
          background="transparent"
          @change="onClassificationChange"
          :placeholder="$t('externalTransfer.ChooseClassification')"
        />
      </div>
      <p v-if="classification && !isClassificationEnable" class="disable-classification">
        {{
          $t("externalTransfer.DisableClassification", {
            classificationName: classification,
          })
        }}
      </p>
    </div>

    <v-card-actions class="popup-confirm">
      <SubmitButton @click="onConfirm" :label="$t('buttons.Continue')" :disabled="disabled" />
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
      classifications: [],
      isClassificationEnable: true,
      resetSelect: null,
      resetInfo: null,
    };
  },
  props: {
    reset: Boolean,
    networkDest: String,
  },
  watch: {
    reset() {
      this.resetSelect = null;
      this.resetInfo = null;
      this.disabled = true;
      this.classification = null;
      this.isClassificationEnable = true;
      this.classifications = [];
    },
    networkDest() {
      this.classifications =
        this.networkDest == undefined ? [] : this.$t(`externalTransfer.Classifications.${this.networkDest}`);
      this.classification = null;
      this.info = "";
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
      if (this.classification) {
        let currClassification = this.classifications.filter(
          (classification) => this.classification == classification.text
        )[0];
        this.isClassificationEnable = currClassification?.enable == undefined ? true : currClassification.enable;
      } else {
        this.isClassificationEnable = false;
      }
      this.info && this.isClassificationEnable ? (this.disabled = false) : (this.disabled = true);
    },
  },
};
</script>

<style scoped>
.select-classfier {
  max-width: 150px;
}
.select-classfier-max {
  max-width: 250px;
}
.disable-classification {
  padding-top: 10px;
  color: red;
}
</style>
