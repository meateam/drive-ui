<template>
  <v-dialog v-model="dialog" max-width="450" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-image auto-margin" :src="require(`@/assets/images/users.svg`)" />
        <p class="d-title">{{ $t("destusers.Title") }}</p>
      </div>
      <div class="popup-body">
        <UserAvatar v-for="(user, index) in users" v-bind:key="index" :user="user" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import UserAvatar from "./UserAvatar";

export default {
  name: "UsersPopup",
  components: { UserAvatar },
  data() {
    return {
      dialog: false,
      users: [],
    };
  },
  methods: {
    open(users) {
      this.users = users;
      this.dialog = true;
    },
    onClose() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
#title {
  font-size: 23px;
  text-align: center;
}
#actions {
  justify-content: center;
  padding: 20px;
}
.popup-image {
  width: 110px;
  padding-top: 30px;
}
</style>
