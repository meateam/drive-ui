<template>
  <div>
    <p id="choose">{{$t('share.DriveChoose')}}</p>
    <Chips
      background="white"
      :placeholder="$t('autocomplete.Users')"
      :items="users"
      @input="onType"
      @keyup.enter.native="onConfirm"
    />
    <v-card-actions class="popup-confirm">
      <Confirm @click="onConfirm" />
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chips from "@/components/inputs/Chips";
import Confirm from "@/components/buttons/Confirm";

export default {
  name: "DriveShare",
  components: { Chips, Confirm },
  computed: {
    ...mapGetters(["users"])
  },
  props: ["files"],
  data() {
    return {
      selectedUsers: []
    };
  },
  methods: {
    async getUsersByName(name) {
      const users = await this.$store.dispatch("getUsersByName", name);
      return users;
    },
    async getUsers() {
      const users = await this.$store.dispatch("searchUsersByName", "נ");
      return users;
    },
    async onType(value) {
      this.selectedUsers = value;
    },
    onConfirm() {
      this.$store.dispatch("shareUsers", {
        files: this.files,
        users: this.selectedUsers,
        role: "READ"
      });
    }
  },
  created() {
    this.getUsers();
  }
};
</script>

<style scoped>
#choose {
  font-size: 18px;
  padding-bottom: 15px;
}
</style>