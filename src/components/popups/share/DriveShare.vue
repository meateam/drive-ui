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
      @type="getUsersByName"
    />
    <div>
      <Chips v-for="user in selectedUsers" :key="user.id" :user="user" @remove="onRemove" />
    </div>
    <v-card-actions class="popup-confirm">
      <Confirm @click="onConfirm" :label="$t('buttons.Share')" />
    </v-card-actions>
  </div>
</template>

<script>
import Chips from "@/components/shared/Chips";
import Autocomplete from "@/components/inputs/Autocomplete";
import Confirm from "@/components/buttons/Confirm";

export default {
  name: "DriveShare",
  components: { Chips, Confirm, Autocomplete },
  props: ["files"],
  data() {
    return {
      selectedUsers: [],
      users: [],
      isLoading: false
    };
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
      this.$store.dispatch("shareUsers", {
        files: this.files,
        users: this.selectedUsers,
        role: "READ"
      });
      this.selectedUsers = [];
      this.$emit("close");
    }
  },
};
</script>

<style scoped>
#choose {
  font-size: 18px;
  padding-bottom: 15px;
}
</style>