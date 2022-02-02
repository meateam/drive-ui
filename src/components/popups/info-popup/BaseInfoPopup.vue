<template>
  <v-dialog v-if="dialog" v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/green-info.svg" />
        <v-icon v-if="file.isFavorite" class="star-popupIcon">star</v-icon>
        <p class="d-title">{{ $t("fileInfo.Info") }}</p>
      </div>
      <div class="popup-body">
        <div class="file-info">
          <KeyValue :field="$t('fileInfo.Owner')" :value="file.owner || '???'" />
          <KeyValue :field="$t('fileInfo.Size')" :value="formatFileSize(file.size)" />
          <KeyValue :field="$t('fileInfo.Name')" :value="file.name" />
          <KeyValue :field="$t('fileInfo.CreatedAt')" :value="formatFileDate(file.createdAt)" />
          <KeyValue :field="$t('fileInfo.Type')" :value="file.type" />
          <KeyValue :field="$t('fileInfo.UpdatedAt')" :value="formatFileDate(file.updatedAt)" />
        </div>
        <v-divider id="divider"></v-divider>
        <div>
          <p>{{ $t("fileInfo.Shared") }}</p>
          <div>
            <div v-if="users.length" class="flex shared">
              <UserAvatar v-for="user in users" :key="user.id" :user="user" />
            </div>
            <div v-else>-</div>
          </div>
          <p>{{ $t("fileInfo.ExternalShare") }}</p>
          <div>
            <div v-if="externalUsers.length" class="flex shared">
              <UserAvatar v-for="user in externalUsers" :key="user.id" :user="user" />
            </div>
            <div v-else>-</div>
          </div>
          <p>{{ $t("fileInfo.ExternalShareFailed") }}</p>
          <div>
            <div v-if="externalUsersFailed.length" class="flex shared">
              <UserAvatar v-for="user in externalUsersFailed" :key="user.id" :user="user" />
            </div>
            <div v-else>-</div>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import _ from "lodash";
import KeyValue from "./BaseKeyValue";
import UserAvatar from "@/components/popups/users-popup/UserAvatar";
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
      externalUsers: [],
      externalUsersFailed: [],
    };
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$store.commit('changePopupStatus')
      } 
    },
  },
  methods: {
    async open() {
      if (!this.$store.getters.popupStatus) {
        let externalPermissionsRes = [];
        this.externalUsers = [];
        this.externalUsersFailed = [];

        [this.users, externalPermissionsRes] = await Promise.all([
        getPermissions(this.file.id),
        getExternalPermissions(this.file.id),
        ]);

        if (externalPermissionsRes) {
        externalPermissionsRes = externalPermissionsRes
          .slice()
          .sort((a, b) => b.createdAt - a.createdAt)
          .filter((user, index, self) => index === self.findIndex((anotherUser) => anotherUser.id === user.id));

        const [externalUsersFailed, externalUsers] = _.partition(externalPermissionsRes, function(externalPermission) {
          return externalPermission.isFailed;
        });

        this.externalUsersFailed = externalUsersFailed;
        this.externalUsers = externalUsers;
        }

        this.dialog = true;
        this.$store.commit('changePopupStatus')
      }
    },
    formatFileSize(size) {
      return formatBytes(size);
    },
    formatFileDate(date) {
      return formatDate(date);
    },
  },
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
.shared {
  margin: 10px 0;
}
p {
  font-size: 17px;
  color: #1b2e35;
}

.star-popupIcon {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 58px; 
  right: 265px;
  color: #FFA500;
}
</style>
