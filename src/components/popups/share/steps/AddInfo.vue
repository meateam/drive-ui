<template>
  <div>
    <p id="choose">{{$t('externalShare.MoreInfo')}}</p>
    <Textarea @input="onChange" :placeholder="$t('externalShare.Describe')" />
    <v-card-actions class="popup-confirm">
      <Confirm @click="onConfirm" :label="$t('buttons.Continue')" />
    </v-card-actions>
  </div>
</template>

<script>
import Textarea from "@/components/inputs/Textarea";
import Confirm from "@/components/buttons/Confirm";

export default {
  name: "AddInfo",
  components: { Textarea, Confirm },
  data() {
    return {
      info: ""
    };
  },
  methods: {
    onConfirm() {
      this.$emit("continue", this.info);
    },
    onChange(value) {
      this.info = value;
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