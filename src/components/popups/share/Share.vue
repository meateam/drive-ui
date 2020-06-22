<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/popupShare.png" />
        <p class="d-title">{{$t('share.Header')}}</p>
        <div class="files">
          <p class="ltr space" v-for="file in files" :key="file.id">{{file.name}}</p>
        </div>
        <v-tabs v-model="tab" slider-color="#357e6f" color="black">
          <v-tab href="#DRIVE" key="DRIVE">{{$t('share.DriveShare')}}</v-tab>
          <v-tab href="#EXTERNAL">{{$t('share.ExternalShare')}}</v-tab>
        </v-tabs>
      </div>
      <div class="popup-body">
        <v-tabs-items v-model="tab">
          <v-tab-item value="DRIVE">
            <DriveShare @close="dialog = false" :files="files" />
          </v-tab-item>
          <v-tab-item
            value="EXTERNAL"
            @close="dialog = false"
            v-if="files.length===1"
          >
            <ExternalShare :file="files[0]" @close="dialog = false"/>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import DriveShare from "./DriveShare";
import ExternalShare from "./ExternalShare";

export default {
  name: "NewFolder",
  props: ["files"],
  components: { DriveShare, ExternalShare },
  data() {
    return {
      dialog: false,
      tab: null
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    onConfirm() {
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.v-tabs {
  display: flex;
  justify-content: center;
}
.files {
  display: flex;
  justify-content: center;
}
.theme--light.v-tabs-items {
  background-color: transparent;
}
</style>