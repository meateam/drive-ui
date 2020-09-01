<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/green-3-share.svg" />
        <p class="d-title">{{$t('share.Header')}}</p>
        <div class="files">
          <p class="ltr space" v-for="file in files" :key="file.id">{{file.name}}</p>
        </div>
      </div>

      <div class="popup-body">
        <p class="popup-text">{{$t('share.DriveChoose')}}</p>

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
        <v-chip-group show-arrows>
          <Chips v-for="user in selectedUsers" :key="user.id" :user="user" @remove="onRemove" />
        </v-chip-group>
        <div class="space-between">
          <div class="select-container">
            <Select
              :items="roles"
              background="transparent"
              @change="onRoleSelect"
              :placeholder="$t('share.ChoosePermission')"
            />
          </div>
          <v-card-actions class="popup-confirm">
            <SubmitButton @click="onConfirm" :label="$t('buttons.Continue')" :disabled="disabled" />
          </v-card-actions>
        </div>
      </div>
    </v-card>

    <v-card class="top-space" v-if="files.length === 1">
      <div class="popup-body align-center">
        <p class="popup-text">{{$t('share.link.OnlyShare')}}</p>
        <v-text-field readonly :label="link" solo append-icon="content_copy" @click:append="copy"></v-text-field>
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
    canEditOnline(file) {
      return fileTypes.office.includes(file.type);
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
.files {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.top-space {
  margin-top: 15px;
}
</style>