<template>
  <div>
    <p class="popup-text">{{$t('share.DriveChoose')}}</p>
    <Autocomplete
      icon
      background="white"
      :placeholder="$t('autocomplete.Users')"
      :items="users"
      :isLoading="isLoading"
      @select="onUserSelect"
      @type="getUsersByName"
    />
    <div>
      <Chips v-for="user in selectedUsers" :key="user.id" :user="user" @remove="onRemove" />
    </div>
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
        <Confirm @click="onConfirm" :label="$t('buttons.Continue')" :disabled="disabled" />
      </v-card-actions>
    </div>
  </div>
</template>

<script>
import Chips from "@/components/shared/Chips";
import Autocomplete from "@/components/inputs/Autocomplete";
import Confirm from "@/components/buttons/Confirm";
import Select from "@/components/inputs/Select";

export default {
  name: "DriveShare",
  components: { Chips, Confirm, Autocomplete, Select },
  props: ["files"],
  data() {
    return {
      selectedUsers: [],
      users: [],
      role: undefined,
      disabled: true,
      isLoading: false,
      roles: [
        { value: "READ", text: this.$t("share.role.read") },
        { value: "WRITE", text: this.$t("share.role.write") }
      ]
    };
  },
  watch: {
    selectedUsers: function(users) {
      this.role && users.length
        ? (this.disabled = false)
        : (this.disabled = true);
    }
  },
  methods: {
    getUsersByName(name) {
      if (this.isLoading) return;
      this.isLoading = true;
      this.$store
        .dispatch("searchUsersByName", name)
        .then(users => {
          this.users = users;
        })
        .catch(err => {
          throw new Error(err);
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
      this.selectedUsers = this.selectedUsers.filter(user => {
        return user.id !== item.id;
      });
    },
    isUserExists(users, id) {
      return users.some(user => user.id === id);
    },
    onConfirm() {
      this.$store.dispatch("shareUsers", {
        files: this.files,
        users: this.selectedUsers,
        role: this.role
      });
      this.selectedUsers = [];
      this.$emit("close");
    }
  }
};
</script>