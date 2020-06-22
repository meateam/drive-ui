<template>
  <div>
    <div>
      <div id="approval-header">
        <p id="choose">{{$t('externalShare.ApprovalChoose')}}</p>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon color="#255f53" v-on="on">info</v-icon>
          </template>
          <span>{{$t('externalShare.ApprovalInstructions')}}</span>
        </v-tooltip>
      </div>

      <Autocomplete
        icon
        background="white"
        :placeholder="$t('autocomplete.Users')"
        :items="users"
        :isLoading="isLoading"
        @select="onSelect"
        @type="getUsersByName"
      />
    </div>
    <div>
      <Chips v-for="user in selectedApprovals" :key="user.id" :user="user" @remove="onRemove" />
    </div>
    <v-card-actions class="popup-confirm">
      <Confirm @click="onConfirm" :label="$t('buttons.Share')" />
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chips from "@/components/shared/Chips";
import Autocomplete from "@/components/inputs/Autocomplete";
import Confirm from "@/components/buttons/Confirm";

export default {
  name: "Approval",
  components: { Chips, Confirm, Autocomplete },
  data() {
    return {
      users: [],
      isLoading: false,
      selectedApprovals: []
    };
  },
  computed: {
    ...mapGetters(["approvalServiceUrl"])
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
    onConfirm() {
      this.$emit("continue", this.selectedApprovals);
    },
    onSelect(user) {
      this.users = [];
      if (!user) return;
      else if (this.isUserExists(this.selectedApprovals, user.id))
        this.remove(user);
      else this.selectedApprovals.push(user);
    },
    onRemove(item) {
      this.selectedApprovals = this.selectedApprovals.filter(user => {
        return user.id !== item.id;
      });
    },
    isUserExists(users, id) {
      return users.some(user => user.id === id);
    }
  }
};
</script>

<style scoped>
#choose {
  font-size: 18px;
  padding-bottom: 15px;
}
#approval-header {
  display: flex;
  justify-content: space-between;
  padding: 3px;
}
</style>