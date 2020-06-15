<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/newFolder.png" />
        <p class="d-title">{{$t('folder.Upload')}}</p>
      </div>
      <div class="popup-body">
        <p class="d-subtitle">{{$t('folder.FolderName')}}</p>
        <TextField
          @keyup.enter.native="onConfirm"
          @input="onNameChange"
          :placeholder="$t('folder.NewFolder')"
        />
        <v-card-actions class="popup-confirm">
          <Confirm @click="onConfirm" />
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import TextField from "../inputs/TextField";
import Confirm from "../buttons/Confirm";

export default {
  name: "NewFolder",
  components: { Confirm, TextField },
  data() {
    return {
      dialog: false,
      folderName: ""
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    onNameChange(name) {
      this.folderName = name;
    },
    onConfirm() {
      this.dialog = false;
      this.$store.dispatch("uploadFolder", this.folderName);
    }
  }
};
</script>

<style scoped>
</style>