<template>
  <div id="note">
    <img src="@/assets/icons/note.png" />
    <p id="notice">{{$t('externalShare.note.Notice')}}</p>
    <p class="secret">{{$t('externalShare.note.SecretNetwork')}}</p>
    <p class="secret">{{$t('externalShare.note.SecretData')}}</p>
    <div id="marks">
      <v-checkbox
        v-for="mark in marks"
        :key="mark"
        :value="mark"
        :label="mark"
        color="#357e6f"
        v-model="selected"
      ></v-checkbox>
    </div>
    <v-card-actions class="popup-confirm">
      <SubmitButton @click="onConfirm" :label="$t('buttons.Share')" :disabled="disabled" />
      <BaseTextButton @click="$emit('back')" :label="$t('buttons.Back')" />
    </v-card-actions>
  </div>
</template>

<script>
import SubmitButton from "@/components/buttons/SubmitButton";
import BaseTextButton from "@/components/buttons/BaseTextButton";

export default {
  name: "Note",
  components: { SubmitButton, BaseTextButton },
  data() {
    return {
      marks: this.$t("externalShare.note.Marks"),
      selected: [],
      disabled: true,
      approved: false
    };
  },
  watch: {
    selected: function(val) {
      if (val.length === this.marks.length) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  },
  methods: {
    onConfirm() {
      this.$emit("complete");
    }
  }
};
</script>

<style scoped>
#note {
  text-align: center;
}
#notice {
  font-size: 30px;
}
.secret {
  font-size: 18px;
}
</style>