<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="share-header flex">
        <v-icon class="share-icon" color="#fff9e5">person_add</v-icon>
        <p
          class="share-title"
        >{{files.length === 1 ? $t('share.ShareFile'):$t('share.ShareFiles') }}</p>
      </div>

      <div class="popup-body">
        <Share v-if="isShareMode" @share="onShare" @back="onBack" :files="files" />
        <EditPermissions
          v-else-if="files.length === 1"
          :users="users"
          @share="isShareMode = true"
          @edit="onPermissionEdit"
          @remove="onPermissionRemove"
        />
      </div>
    </v-card>
    <CopyPopup v-if="files.length === 1" :link="link" :file="files[0]" />
  </v-dialog>
</template>

<script>
import * as filesApi from "@/api/files";
import * as shareApi from "@/api/share";
import Share from "./tabs/Share";
import EditPermissions from "./tabs/EditPermissions";
import CopyPopup from "./CopyPopup";

export default {
  name: "SharePopup",
  data() {
    return {
      dialog: false,
      isShareMode: false,
      link: "",
      users: [],
    };
  },
  components: { Share, EditPermissions, CopyPopup },
  watch: {
    dialog: function (val) {
      if (!val) this.isShareMode = val;
    },
  },
  props: ["files"],
  methods: {
    async open() {
      this.dialog = true;

      if (this.files.length === 1) {
        const file = this.files[0];

        this.link = filesApi.getFileLink(file);
        this.users = await shareApi.getPermissions(file.id);
      } else {
        this.isShareMode = true;
      }
    },
    async onPermissionEdit(shareObject) {
      await shareApi.editPermission({
        ...shareObject,
        fileID: this.files[0].id,
      });
    },
    async onPermissionRemove(permission) {
      await shareApi.removePermission({
        ...permission,
        fileID: this.files[0].id,
      });
      this.users = this.users.filter((user) => user.id != permission.userID);
    },
    async onShare(shareObject) {
      await shareApi.shareUsers(shareObject);

      if (this.files.length === 1) {
        shareObject.users.forEach((user) => {
          this.users.push({ ...user, role: shareObject.role });
        });
        this.isShareMode = false;
      } else {
        this.dialog = false;
      }
    },
    async onBack() {
      this.isShareMode = false;
      this.users = await shareApi.getPermissions(this.files[0].id);
    },
  },
};
</script>

<style scoped>
.top-space {
  margin-top: 15px;
}
.d-title {
  padding-bottom: 10px;
}
.popup-body {
  padding: 10px 40px;
}
</style>