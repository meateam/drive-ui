<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="share-header flex">
        <v-icon class="share-icon">person_add</v-icon>
        <p class="share-title">{{$t('share.Header')}}</p>
      </div>

      <div class="popup-body">
        <p class="popup-text">{{$t('share.DriveChoose')}}</p>
        <div class="space-between">
          <Autocomplete
            icon
            background="white"
            :placeholder="$t('autocomplete.Users')"
            :items="users"
            :isLoading="isLoading"
            :minLength="2"
            @select="onUserSelect"
            @type="getUsersByName"
          />
          <div class="select-container">
            <Select
              :items="roles"
              background="transparent"
              @change="onRoleSelect"
              :placeholder="$t('share.ChoosePermission')"
            />
          </div>
        </div>
        <v-chip-group show-arrows>
          <Chips v-for="user in selectedUsers" :key="user.id" :user="user" @remove="onRemove" />
        </v-chip-group>

        <v-card-actions class="popup-confirm">
          <SubmitButton @click="onConfirm" :label="$t('buttons.Share')" :disabled="disabled" />
        </v-card-actions>
      </div>
    </v-card>

    <v-card class="top-space" v-if="files.length === 1">
      <div>
        <div class="share-header flex">
          <v-icon class="share-icon">share</v-icon>
          <p class="share-title">{{getLinkType()}}</p>
        </div>

        <p class="link">{{$t('share.link.OnlyShare')}}</p>

        <v-card-actions class="popup-confirm">
          <v-btn text small @click="copy" class="link">
            <p>{{$t('buttons.CopyLink')}}</p>
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import * as usersApi from "@/api/users";
import * as shareApi from "@/api/share";
import * as filesApi from "@/api/files";
import { fileTypes } from "@/config";
import Chips from "@/components/shared/BaseChips";
import Autocomplete from "@/components/inputs/BaseAutocomplete";
import SubmitButton from "@/components/buttons/BaseSubmitButton";
import Select from "@/components/inputs/BaseSelect";

export default {
  name: "SharePopup",
  data() {
    return {
      dialog: false,
      selectedUsers: [],
      users: [],
      role: undefined,
      disabled: true,
      isLoading: false,
      link: "",
      roles: [
        { value: "READ", text: this.$t("share.role.READ") },
        { value: "WRITE", text: this.$t("share.role.WRITE") },
      ],
    };
  },
  components: { Chips, SubmitButton, Autocomplete, Select },
  props: ["files"],
  watch: {
    selectedUsers: function (users) {
      this.role && users.length
        ? (this.disabled = false)
        : (this.disabled = true);
    },
  },
  methods: {
    open() {
      this.dialog = true;

      if (this.files.length === 1)
        this.link = filesApi.getFileLink(this.files[0]);
    },
    getUsersByName(name) {
      if (this.isLoading) return;
      this.isLoading = true;
      usersApi
        .searchUsersByName(name)
        .then((users) => {
          this.users = users;
        })
        .finally(() => (this.isLoading = false));
    },
    onUserSelect(user) {
      this.users = [];
      if (!user) return;
      else if (this.isUserExists(this.selectedUsers, user.id))
        this.remove(user);
      else this.selectedUsers.push(user);
    },
    onRoleSelect(role) {
      this.role = role;
      this.role && this.selectedUsers.length
        ? (this.disabled = false)
        : (this.disabled = true);
    },
    onRemove(item) {
      this.selectedUsers = this.selectedUsers.filter((user) => {
        return user.id !== item.id;
      });
    },
    isUserExists(users, id) {
      return users.some((user) => user.id === id);
    },
    copy() {
      navigator.clipboard.writeText(this.link);
      this.$store.commit("onSuccess", "success.Copied");
    },
    getLinkType() {
      const type = this.files[0].type;
      if (type === fileTypes.folder) {
        return this.$t("share.link.FolderLink");
      } else if (fileTypes.office.includes(type)) {
        return this.$t("share.link.EditOnlineLink");
      } else {
        return this.$t("share.link.DownloadLink");
      }
    },
    onConfirm() {
      shareApi.shareUsers({
        files: this.files,
        users: this.selectedUsers,
        role: this.role,
      });
      this.selectedUsers = [];
      this.dialog = false;
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
.popup-icon {
  width: 70px;
  padding-top: 30px;
}
.share-icon {
  width: 40px;
  height: 40px;
  margin: auto 25px auto 10px;
  font-size: 25px;
  color: #fff9e5;
  background-color: #007a99;
  border-radius: 50%;
}
.share-header {
  height: 80px;
  line-height: 80px;
}
.share-title {
  font-size: 26px;
  color: #353446;
}
.popup-body {
  padding: 10px 25px;
}
.link {
  margin: 5px 25px;
  font-size: 15px;
  color: #353446;
}
</style>