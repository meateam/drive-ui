<template>
  <div>
    <p class="popup-text">{{$t('share.DriveChoose')}}</p>
    <Autocomplete
      icon
      background="white"
      :placeholder="$t('autocomplete.Users')"
      :items="users"
      :isLoading="isLoading"
      :minLength="2"
      @select="onSelect"
      @type="getExternalUsersByName"
    />
    <v-chip-group show-arrows>
      <Chips v-for="user in selectedUsers" :key="user.id" :user="user" @remove="onRemove" />
    </v-chip-group>
    <v-card-actions class="popup-confirm">
      <SubmitButton @click="onConfirm" :label="$t('buttons.Continue')" :disabled="disabled" />
    </v-card-actions>
  </div>
</template>

<script>
import * as usersApi from "@/api/users";
import Chips from "@/components/shared/BaseChips";
import Autocomplete from "@/components/inputs/BaseAutocomplete";
import SubmitButton from "@/components/buttons/BaseSubmitButton";

export default {
  name: "Destination",
  components: { Chips, SubmitButton, Autocomplete },
  data() {
    return {
      selectedUsers: [],
      users: [],
      isLoading: false,
      disabled: true
    };
  },
  watch: {
    selectedUsers: function(users) {
      users.length ? (this.disabled = false) : (this.disabled = true);
    }
  },
  methods: {
    getExternalUsersByName(name) {
      if (this.isLoading) return;
      this.isLoading = true;
      usersApi
        .searchExternalUsersByName(name)
        .then(users => (this.users = users))
        .finally(() => (this.isLoading = false));
    },
    onSelect(user) {
      this.users = [];
      if (!user) return;
      else if (this.isUserExists(this.selectedUsers, user.id))
        this.remove(user);
      else this.selectedUsers.push(user);
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
      this.$emit(
        "continue",
        this.selectedUsers.map(user => {
          return { id: user.id, full_name: user.full_name };
        })
      );
    }
  }
};
</script>