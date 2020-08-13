<template>
  <v-dialog v-model="dialog" max-width="700">
    <v-card color="white" id="note">
      <img class="popup-icon" src="@/assets/icons/green-note.svg" />
      <p id="notice">{{$t('externalShare.note.Notice')}}</p>
      <p class="secret">{{$t('externalShare.note.SecretNetwork')}}</p>
      <p class="secret">{{$t('externalShare.note.SecretData')}}</p>
      <div id="marks" class="space-right">
        <v-checkbox
          v-for="mark in marks"
          :key="mark"
          :value="mark"
          :label="mark"
          color="#035c64"
          v-model="selected"
        ></v-checkbox>
      </div>
      <v-checkbox
        :disabled="selected.length !== marks.length"
        :label="$t('externalShare.note.IAgree')"
        color="#035c64"
        v-model="agreed"
      ></v-checkbox>
      <v-card-actions class="popup-confirm">
        <SubmitButton @click="onConfirm" :label="$t('buttons.Share')" :disabled="!agreed" />
        <TextButton @click="onBack" :label="$t('buttons.Back')" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SubmitButton from "@/components/buttons/BaseSubmitButton";
import TextButton from "@/components/buttons/BaseTextButton";

export default {
  name: "Note",
  components: { SubmitButton, TextButton },
  data() {
    return {
      marks: this.$t("externalShare.note.Marks"),
      selected: [],
      agreed: false,
      dialog: false,
    };
  },
  watch: {
    selected: function (val) {
      if (val.length !== this.marks.length) {
        this.agreed = false;
      }
    },
  },
  methods: {
    onConfirm() {
      this.$emit("complete");
      this.close();
    },
    onBack() {
      this.close();
    },
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.selected = [];
    },
  },
};
</script>

<style scoped>
#note {
  text-align: center;
  padding: 20px;
}
#notice {
  font-size: 40px;
}
.secret {
  font-size: 18px;
}
.popup-icon {
  padding: 20px 0;
}
.space-right {
  padding-right: 20px;
}
</style>