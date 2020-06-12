<template>
  <v-dialog v-model="dialog" max-width="720" id="folder-dialog">
    <v-card>
      <div id="popup-header">
        <img id="folder-icon" class="auto-margin" src="@/assets/icons/newFolder.png" />
        <p class="d-title">{{$t('folder.Upload')}}</p>
      </div>
      <div id="popup-body">
        <div class="section">
          <p class="d-subtitle">{{$t('folder.FolderName')}}</p>
          <TextField @input="onNameChange" :placeholder="$t('folder.NewFolder')" />
        </div>
        <v-card-actions id="confirm">
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
#folder-dialog {
  border-radius: 10px;
  position: relative;
}
#popup-header {
  padding-bottom: 20px;
  background-color: #ffffff;
  width: 100%;
}
#folder-icon {
  padding: 60px 0 15px;
}
#popup-body {
  height: 250px;
  background-color: #f0f4f7;
  width: 100%;
}
#confirm {
  position: absolute;
  bottom: 50px;
  left: 50px;
}
.section {
  padding: 30px 60px 0px 60px;
}
</style>