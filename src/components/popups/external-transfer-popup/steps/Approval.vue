<template>
  <div>
    <div v-if="user.approvalInfo.canApprove">
      <p class="popup-text align-center">{{$t('externalTransfer.CanApprove')}}</p>
    </div>
    <div v-else>
      <div>
        <div id="approval-header" class="space-between">
          <p class="popup-text">{{$t('externalTransfer.ApprovalChoose')}}</p>
          <v-tooltip top color="#2c3448">
            <template v-slot:activator="{ on }">
              <v-icon color="#2c3448" v-on="on">info</v-icon>
            </template>

            <div class="align-center">
              <p>{{$t('externalTransfer.ApprovalInstructions')}}</p>
              <div v-if="user.approvalInfo.unit && user.approvalInfo.ranks">
                <p>
                  {{$t('externexternalTransferalShare.ApproverUnit')}}
                  <span class="bold">{{user.approvalInfo.unit}}</span>
                  , {{$t('externalTransfer.ApproverRanks')}}
                </p>
                <p class="bold">{{getRanks()}}</p>
                <p class="bold">{{whiteListText}}</p>
              </div>
            </div>
          </v-tooltip>
        </div>

        <Autocomplete
          icon
          background="white"
          :placeholder="$t('autocomplete.Users')"
          :items="users"
          :minLength="2"
          :isLoading="isLoading"
          @select="onSelect"
          @type="getUsersByName"
        />
      </div>
      <v-chip-group show-arrows>
        <Chips v-for="user in selectedApprovals" :key="user.id" :user="user" @remove="onRemove" />
      </v-chip-group>
    </div>

    <v-card-actions class="popup-confirm">
      <SubmitButton @click="onConfirm" :label="$t('buttons.Continue')" :disabled="disabled" />
      <TextButton @click="$emit('back')" :label="$t('buttons.Back')" />
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as usersApi from "@/api/users";
import Chips from "@/components/shared/BaseChips";
import Autocomplete from "@/components/inputs/BaseAutocomplete";
import SubmitButton from "@/components/buttons/BaseSubmitButton";
import TextButton from "@/components/buttons/BaseTextButton";

export default {
  name: "Approval",
  components: { Chips, SubmitButton, Autocomplete, TextButton },
  data() {
    return {
      users: [],
      isLoading: false,
      selectedApprovals: [],
      disabled: true,
    };
  },
  computed: {
    ...mapGetters(["user", "whiteListText"]),
  },
  watch: {
    selectedApprovals: function (users) {
      users.length ? (this.disabled = false) : (this.disabled = true);
    },
  },
  created() {
    this.disabled = !this.user.approvalInfo.canApprove;
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
    onConfirm() {
      this.$emit(
        "continue",
        this.selectedApprovals.map((user) => user.id)
      );
    },
    getRanks() {
      return this.user.approvalInfo.ranks.toString().split(",").join(", ");
    },
    onSelect(user) {
      this.users = [];
      if (!user) return;
      else if (this.isUserExists(this.selectedApprovals, user.id))
        this.remove(user);
      else this.selectedApprovals.push(user);
    },
    onRemove(item) {
      this.selectedApprovals = this.selectedApprovals.filter((user) => {
        return user.id !== item.id;
      });
    },
    isUserExists(users, id) {
      return users.some((user) => user.id === id);
    },
  },
};
</script>

<style scoped>
#approval-header {
  padding: 3px;
}
</style>