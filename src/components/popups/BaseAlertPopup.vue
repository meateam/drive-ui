<template>
  <v-dialog v-model="dialog" max-width="450" class="popup">
    <v-card>
      <img
        class="popup-image auto-margin"
        :src="require(`@/assets/images/${img}`)"
      />
      <p id="title">{{ text }}</p>
      <v-card-actions id="actions">
        <TextButton @click="onCancel" :label="$t('buttons.Cancel')" />
        <SubmitButton @click="onConfirm" :label="button" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SubmitButton from "@/components/buttons/BaseSubmitButton";
import TextButton from "@/components/buttons/BaseTextButton";

export default {
  name: "AlertPopup",
  components: { SubmitButton, TextButton },
  data() {
    return {
      dialog: false,
      data: undefined,
    };
  },
  props: ["img", "text", "button"],
  methods: {
    open(data) {
      this.data = data;
      this.dialog = true;
    },
    onConfirm() {
      this.$emit("confirm", this.data);
      this.dialog = false;
    },
    onCancel() {
      this.$emit("cancel", this.data);
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
#title {
  font-size: 23px;
  text-align: center;
}
#actions {
  justify-content: center;
  padding: 20px;
}
.popup-image {
  width: 110px;
  padding-top: 30px;
}
</style>