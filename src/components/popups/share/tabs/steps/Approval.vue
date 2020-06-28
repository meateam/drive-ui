<template>
  <div>
    <div>
      <div id="approval-header" class="space-between">
        <p class="popup-text">{{$t('externalShare.ApprovalChoose')}}</p>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon color="#2c3448" v-on="on">info</v-icon>
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
    <v-chip-group show-arrows>
      <Chips v-for="user in selectedApprovals" :key="user.id" :user="user" @remove="onRemove" />
    </v-chip-group>
    <v-card-actions class="popup-confirm">
      <Confirm @click="onConfirm" :label="$t('buttons.Share')" :disabled="disabled" />
      <BaseTextButton @click="$emit('back')" :label="$t('buttons.Back')"/>
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chips from "@/components/shared/Chips";
import Autocomplete from "@/components/inputs/Autocomplete";
import Confirm from "@/components/buttons/Confirm";
import BaseTextButton from "@/components/buttons/BaseTextButton";

export default {
  name: "Approval",
  components: { Chips, Confirm, Autocomplete, BaseTextButton },
  data() {
    return {
      users: [],
      isLoading: false,
      selectedApprovals: [],
      disabled: true
    };
  },
  computed: {
    ...mapGetters(["approvalServiceUrl"])
  },
  watch: {
    selectedApprovals: function(users) {
      users.length ? (this.disabled = false) : (this.disabled = true);
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
    onConfirm() {
      this.$emit(
        "continue",
        this.selectedApprovals.map(user => user.id)
      );
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
#approval-header {
  padding: 3px;
}
</style>