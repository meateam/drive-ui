<template>
  <v-speed-dial id="fab" v-model="fab" direction="top" transition="scale-transition">
    <template v-slot:activator>
      <v-btn v-model="fab" fab color="#283145" @click="onFabClick">
        <v-icon color="white" v-if="fab">close</v-icon>
        <v-icon color="white" v-else>add</v-icon>
      </v-btn>
      <Upload ref="upload" />
    </template>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn @click.stop="$refs.newFolder.open()" v-on="on" fab big color="#357e6f">
          <NamePopup
            img="green-create-folder.svg"
            ref="newFolder"
            type="folder"
            @confirm="onFolderConfirm"
          />
          <img class="icon" src="@/assets/icons/create-folder.svg" />
        </v-btn>
      </template>
      <span>{{ $t("buttons.NewFolder") }}</span>
    </v-tooltip>
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" fab color="#357e6f" @click="$refs.upload.open()">
          <img class="icon" src="@/assets/icons/upload.svg" />
        </v-btn>
      </template>
      <span>{{ $t("buttons.UploadFile") }}</span>
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
import Upload from "./Upload";
import NamePopup from "../popups/BaseNamePopup";

export default {
  name: "FabButton",
  data() {
    return {
      fab: false
    };
  },
  components: { Upload, NamePopup },
  methods: {
    onFolderConfirm(name) {
      this.$store.dispatch("uploadFolder", name).then(() => {
        if (this.$tours["tour"].currentStep === 5) {
          this.$tours["tour"].nextStep();
        }
      });
    },
    onFabClick() {
      if (this.$tours["tour"].currentStep === 3) {
        this.$tours["tour"].nextStep();
      }
    }
  }
};
</script>

<style scoped>
#fab {
  position: fixed;
  direction: ltr;
  bottom: 50px;
  left: 50px;
}
.icon {
  width: 28px;
  font-size: 50px;
}
</style>