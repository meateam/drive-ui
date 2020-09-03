<template>
  <v-dialog v-if="dialog" v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/green-info.svg" />
        <p class="d-title">{{$t('fileInfo.Info')}}</p>
      </div>
      <div class="popup-body">
        <div class="file-info">
          <KeyValue :field="$t('fileInfo.Owner')" :value="file.owner" />
          <KeyValue :field="$t('fileInfo.Size')" :value="formatFileSize(file.size)" />
          <KeyValue :field="$t('fileInfo.Name')" :value="file.name" />
          <KeyValue :field="$t('fileInfo.CreatedAt')" :value="formatFileDate(file.createdAt)" />
          <KeyValue :field="$t('fileInfo.Type')" :value="file.type" />
          <KeyValue :field="$t('fileInfo.UpdatedAt')" :value="formatFileDate(file.updatedAt)" />
        </div>
        <v-divider id="divider"></v-divider>
        <div>
          <p>{{$t('fileInfo.Shared')}}</p>
          <div>
            <div v-if="users.length" class="flex">
              <UserAvatar v-for="user in users" :key="user.id" :user="user" />
            </div>
            <div v-else>-</div>
          </div>
          <p>{{$t('fileInfo.ExternalShare')}}</p>
          <div>
            <div v-if="externalUsers.length" class="flex">
              <UserAvatar v-for="user in externalUsers" :key="user.id" :user="user" />
            </div>
            <div v-else>-</div>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import KeyValue from "./BaseKeyValue";
import UserAvatar from "./UserAvatar";
import { getPermissions, getExternalPermissions } from "@/api/share";
import { formatBytes } from "@/utils/formatBytes";
import { formatDate } from "@/utils/formatDate";

export default {
  name: "FileInfo",
  props: ["file"],
  components: { KeyValue, UserAvatar },
  data() {
    return {
      dialog: false,
      users: [],
      externalUsers: []
    };
  },
  methods: {
    async open() {
      this.users = await getPermissions(this.file.id);
      this.externalUsers = await getExternalPermissions(this.file.id);
      
      this.dialog = true;
    },
    formatFileSize(size) {
      return formatBytes(size);
    },
    formatFileDate(date) {
      return formatDate(date);
    }
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