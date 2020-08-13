<template>
  <v-dialog v-model="dialog" max-width="600" class="popup" id="share-popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/green-3-share.svg" />
        <p class="d-title">{{$t('share.Header')}}</p>
        <div class="files">
          <p class="ltr space" v-for="file in files" :key="file.id">{{file.name}}</p>
        </div>
        <v-tabs v-model="tab" slider-color="#035c64" color="black">
          <v-tab href="#DRIVE" key="DRIVE">{{$t('share.DriveShare')}}</v-tab>
          <v-tab href="#EXTERNAL">{{$t('share.ExternalShare')}}</v-tab>
        </v-tabs>
      </div>
      <div class="popup-body">
        <v-tabs-items v-model="tab">
          <v-tab-item value="DRIVE">
            <DriveShare @close="dialog = false" :files="files" />
          </v-tab-item>
          <v-tab-item value="EXTERNAL">
            <ExternalShare
              v-if="files.length===1 && isFileAllowed(files[0])"
              :file="files[0]"
              @close="dialog = false"
            />
            <div v-else id="error">
              <div
                v-if="files.length!==1"
                class="popup-text"
              >{{$t('externalShare.errors.OneFileOnly')}}</div>
              <div v-else-if="!isFileAllowed(files[0])">
                <p class="popup-text">{{$t('externalShare.errors.FileType')}}</p>
                <p>{{getAllowedTypes()}}</p>
              </div>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { fileTypes } from "@/config";
import DriveShare from "./tabs/drive-share/DriveShare";
import ExternalShare from "./tabs/external-share/ExternalShare";

export default {
  name: "SharePopup",
  components: { DriveShare, ExternalShare },
  data() {
    return {
      dialog: false,
      tab: null
    };
  },
  props: ["files"],
  methods: {
    open() {
      this.dialog = true;
    },
    isFileAllowed(file) {
      const nameArray = file.name.split(".");
      const fileType = nameArray[nameArray.length - 1];
      return fileTypes.externalShare.includes(fileType.toLowerCase());
    },
    getAllowedTypes() {
      return fileTypes.externalShare
        .toString()
        .split(",")
        .join(", ");
    }
  }
};
</script>

<style scoped>
#share-popup {
  position: relative;
}
.v-tabs {
  display: flex;
  justify-content: center;
}
.files {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.theme--light.v-tabs-items {
  background-color: transparent;
}
#error {
  text-align: center;
}
</style>