<template>
  <div>
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
      <TextButton v-if="files.length === 1" @click="$emit('back')" :label="$t('buttons.EditPermission')" />
    </v-card-actions>
  </div>
</template>

<script>
import * as usersApi from "@/api/users";
import Chips from "@/components/shared/BaseChips";
import Autocomplete from "@/components/inputs/BaseAutocomplete";
import SubmitButton from "@/components/buttons/BaseSubmitButton";
import Select from "@/components/inputs/BaseSelect";
import TextButton from "@/components/buttons/BaseTextButton";

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
      roles: [
        { value: "READ", text: this.$t("share.role.READ") },
        { value: "WRITE", text: this.$t("share.role.WRITE") },
      ],
    };
  },
  components: { Chips, SubmitButton, Autocomplete, Select, TextButton },
  props: ["files"],
  watch: {
    selectedUsers: function (users) {
      this.role && users.length
        ? (this.disabled = false)
        : (this.disabled = true);
    },
  },
  methods: {
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
    onConfirm() {
      const shareObject = {
        files: this.files,
        users: this.selectedUsers,
        role: this.role,
      };

      this.selectedUsers = [];
      this.$emit("share", shareObject);
    },
  },
};
</script>

<style scoped>
</style>