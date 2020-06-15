<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/file.png" />
        <p class="d-title">{{$t('fileInfo.Info')}}</p>
      </div>
      <div class="popup-body">
        <div class="file-info">
          <KeyValue :field="$t('fileInfo.Owner')" :value="file.owner" />
          <KeyValue :field="$t('fileInfo.Size')" :value="formatBytes(file.size)" />
          <KeyValue :field="$t('fileInfo.Name')" :value="file.name" />
          <KeyValue :field="$t('fileInfo.CreatedAt')" :value="file.createdAt" />
          <KeyValue :field="$t('fileInfo.Type')" :value="file.type" />
          <KeyValue :field="$t('fileInfo.UpdatedAt')" :value="file.updatedAt" />
        </div>
        <v-divider id="divider"></v-divider>
        <div>
          <p>{{$t('fileInfo.Shared')}}</p>
          <AvatarList :users="shared" />
          <p>{{$t('fileInfo.ExternalShare')}}</p>
          <AvatarList :users="externalShared" />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import fileSize from "filesize";
import KeyValue from "@/components/shared/KeyValue";
import AvatarList from "@/components/avatar/AvatarList";

export default {
  name: "FileInfo",
  props: ["file"],
  components: { KeyValue, AvatarList },
  data() {
    return {
      dialog: false,
      shared: [],
      externalShared: []
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    /**
     * get the the formated size of the file
     * @param bytes is the bytes to format
     */
    formatBytes(bytes) {
      if (bytes == 0) return "-";
      return fileSize(bytes);
    },
    async getSharedUsers(fileID) {
      const shared = await this.$store.dispatch("getFileSharedUsers", fileID);
      this.shared = shared;
      const externalShared = await this.$store.dispatch(
        "getFileExternalSharedUsers",
        fileID
      );
      this.externalShared = externalShared;
    }
  },
  created() {
    this.getSharedUsers(this.file.id);
  }
};
</script>

<style scoped>
.file-info {
  display: grid;
  grid-template-columns: auto auto;
}
.popup-header {
  padding-bottom: 0;
}
#divider {
  margin: 25px 0;
}
p {
  font-size: 17px;
  color: #1b2e35;
}
</style>