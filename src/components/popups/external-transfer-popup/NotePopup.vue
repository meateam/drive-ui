<template>
  <v-dialog v-model="dialog" max-width="700">
    <v-card color="white" id="note">
      <div id="note-icon">
        <img class="popup-icon" src="@/assets/icons/note.svg" />
      </div>

      <p id="notice">{{$t('externalTransfer.note.Notice')}}</p>
      <p class="secret">{{$t('externalTransfer.note.SecretNetwork')}}</p>
      <p class="secret">{{$t('externalTransfer.note.SecretData')}}</p>
      <div id="marks" class="space-right">
        <v-checkbox
          v-for="mark in marks"
          :key="mark"
          :value="mark"
          :label="mark"
          color="red"
          v-model="selected"
        ></v-checkbox>
        <v-checkbox
          :disabled="selected.length !== marks.length"
          :label="$t('externalTransfer.note.IAgree')"
          color="red"
          v-model="agreed"
        ></v-checkbox>
      </div>
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
      marks: this.$t("externalTransfer.note.Marks"),
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
  padding: 15px 0;
  width: 100px;
}
.space-right {
  padding-right: 20px;
}
#note-icon {
  animation: grow 0.75s;
}
@keyframes grow {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>