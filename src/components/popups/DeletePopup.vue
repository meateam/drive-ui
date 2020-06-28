<template>
  <v-dialog v-model="dialog" max-width="450" class="popup">
    <v-card>
      <img class="popup-icon auto-margin" :src="require(`@/assets/images/${img}`)" />
      <p id="title">{{text}}</p>
      <v-card-actions id="actions">
        <BaseTextButton @click="dialog = false" :label="$t('buttons.Cancel')" />
        <SubmitButton @click="onConfirm" :label="button" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SubmitButton from "@/components/buttons/SubmitButton";
import BaseTextButton from "@/components/buttons/BaseTextButton";

export default {
  name: "DeletePopup",
  components: { SubmitButton, BaseTextButton },
  data() {
    return {
      dialog: false
    };
  },
  props: ["img", "text", "button"],
  methods: {
    open() {
      this.dialog = true;
    },
    onConfirm() {
      this.$emit("delete");
      this.dialog = false;
    }
  }
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
</style>