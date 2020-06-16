<template>
  <div>
    <p id="choose">{{$t('share.DriveChoose')}}</p>
    <Autocomplete
      icon
      background="white"
      :placeholder="$t('autocomplete.Users')"
      :items="users"
      @input="onType"
      @keyup.enter.native="onConfirm"
    />
    <div>
      <Chips v-for="user in selectedUsers" :key="user.id" :user="user" @remove="remove" />
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
      users: []
    };
  },
  methods: {
    async getUsersByName(name) {
      this.users = await this.$store.dispatch("searchUsersByName", name);
    },
    onType(value) {
      console.log(value)
      // this.getUsersByName(value);
    },
    onSelect(user) {
      this.selectedUsers.push(user);
    },
    remove(item) {
      this.selectedUsers = this.selectedUsers.filter(user => {
        return user !== item;
      });
    },
    onConfirm() {
      this.$store.dispatch("shareUsers", {
        files: this.files,
        users: this.selectedUsers,
        role: "READ"
      });
      this.$emit("close");
    }
  },
  created() {
    this.getUsersByName("נ");
  }
};
</script>

<style scoped>
#choose {
  font-size: 18px;
  padding-bottom: 15px;
}
</style>