<template>
  <div>
    <p id="choose">{{$t('externalShare.MoreInfo')}}</p>
    <Textarea @input="onInfoChange" :placeholder="$t('externalShare.Describe')" />
    <div class="space-between">
      <div class="select-container">
        <Select
          :items="classifications"
          background="transparent"
          @change="onClassificationChange"
          :placeholder="$t('externalShare.ChooseClassification')"
        />
      </div>

      <v-card-actions class="popup-confirm">
        <Confirm @click="onConfirm" :label="$t('buttons.Continue')" :disabled="disabled" />
      </v-card-actions>
    </div>
  </div>
</template>

<script>
import Textarea from "@/components/inputs/Textarea";
import Select from "@/components/inputs/Select";
import Confirm from "@/components/buttons/Confirm";

export default {
  name: "AddInfo",
  components: { Textarea, Confirm, Select },
  data() {
    return {
      info: "",
      classification: undefined,
      disabled: true,
      classifications: this.$t("externalShare.Classifications")
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

<style scoped>
#choose {
  font-size: 18px;
  padding-bottom: 15px;
}
</style>