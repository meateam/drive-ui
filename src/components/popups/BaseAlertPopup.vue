<template>
  <v-dialog v-model="dialog" max-width="450" class="popup">
    <v-card>
      <img class="popup-image auto-margin" :src="require(`@/assets/images/${img}`)" />
      <p id="title">{{text}}</p>
      <v-card-actions id="actions">
        <TextButton @click="dialog = false" :label="$t('buttons.Cancel')" />
        <SubmitButton @click="onConfirm" :label="button" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SubmitButton from "@/components/buttons/BaseSubmitButton";
import TextButton from "@/components/buttons/BaseTextButton";

export default {
  name: "DeletePopup",
  components: { SubmitButton, TextButton },
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
.popup-image {
  width: 110px;
  padding-top: 30px;
}
</style>