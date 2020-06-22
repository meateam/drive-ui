<template>
  <div>
    <p id="choose">{{$t('share.DriveChoose')}}</p>
    <Autocomplete
      icon
      background="white"
      :placeholder="$t('autocomplete.Users')"
      :items="users"
      :isLoading="isLoading"
      @select="onSelect"
      @type="getExternalUsersByName"
    />
    <div>
      <Chips v-for="user in selectedUsers" :key="user.id" :user="user" @remove="onRemove" />
    </div>
    <v-card-actions class="popup-confirm">
      <Confirm @click="onConfirm" :label="$t('buttons.Continue')" :disabled="disabled" />
    </v-card-actions>
  </div>
</template>

<script>
import Chips from "@/components/shared/Chips";
import Autocomplete from "@/components/inputs/Autocomplete";
import Confirm from "@/components/buttons/Confirm";

export default {
  name: "Destination",
  components: { Chips, Confirm, Autocomplete },
  data() {
    return {
      selectedUsers: [],
      users: [],
      isLoading: false,
      disabled: true,
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
      this.$store
        .dispatch("searchExternalUsersByName", name)
        .then(users => (this.users = users))
        .catch(err => {
          throw new Error(err);
        })
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
      this.$emit("continue", this.selectedUsers);
    }
  }
};
</script>

<style scoped>
#choose {
  font-size: 18px;
  padding-bottom: 15px;
}
</style>