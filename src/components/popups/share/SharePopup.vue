<template>
  <v-dialog v-model="dialog" max-width="600" class="popup" id="share-popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/green-share.svg" />
        <p class="d-title">{{$t('share.Header')}}</p>
        <div class="files">
          <p class="ltr space" v-for="file in chosenFiles" :key="file.id">{{file.name}}</p>
        </div>
        <v-tabs v-model="tab" slider-color="#357e6f" color="black">
          <v-tab href="#DRIVE" key="DRIVE">{{$t('share.DriveShare')}}</v-tab>
          <v-tab href="#EXTERNAL">{{$t('share.ExternalShare')}}</v-tab>
        </v-tabs>
      </div>
      <div class="popup-body">
        <v-tabs-items v-model="tab">
          <v-tab-item value="DRIVE">
            <DriveShare @close="dialog = false" :files="chosenFiles" />
          </v-tab-item>
          <v-tab-item value="EXTERNAL">
            <ExternalShare
              v-if="chosenFiles.length===1 && isFileAllowed(chosenFiles[0])"
              :file="chosenFiles[0]"
              @close="dialog = false"
            />
            <div v-else id="error">
              <div
                v-if="chosenFiles.length!==1"
                class="popup-text"
              >{{$t('externalShare.errors.OneFileOnly')}}</div>
              <div v-else-if="!isFileAllowed(chosenFiles[0])">
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
import { mapGetters } from "vuex";
import DriveShare from "./tabs/DriveShare";
import ExternalShare from "./tabs/ExternalShare";

export default {
  name: "NewFolder",
  components: { DriveShare, ExternalShare },
  data() {
    return {
      dialog: false,
      tab: null
    };
  },
  computed: {
    ...mapGetters(["allowedFileTypes", "chosenFiles"])
  },
  methods: {
    open() {
      this.dialog = true;
    },
    isFileAllowed(file) {
      const nameArray = file.name.split(".");
      const fileType = nameArray[nameArray.length - 1];
      return this.allowedFileTypes.includes(fileType.toLowerCase());
    },
    getAllowedTypes() {
      return this.allowedFileTypes
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
}
.theme--light.v-tabs-items {
  background-color: transparent;
}
#error {
  text-align: center;
}
</style>