<template>
  <div>
    <div v-if="user.approverInfo.isAdmin">
      <p class="popup-text align-center">
        {{ $t("externalTransfer.CanApprove") }}
      </p>
    </div>

    <div v-else-if="user.approverInfo.noUnit">
      <p class="popup-text align-center">
        {{ $t("externalTransfer.NoUnit") }}
      </p>
    </div>

    <div v-else-if="user.approverInfo.isBlocked">
      <p class="popup-text align-center">
        {{ $t("externalTransfer.IsBlocked") }}
      </p>
    </div>

    <div v-else-if="user.approverInfo.isApprover">
      <p class="popup-text align-center">
        {{ $t("externalTransfer.CanApprove") }}
      </p>
    </div>

    <div v-else>
      <div>
        <div id="approval-header" class="space-between">
          <p class="popup-text">{{ $t("externalTransfer.ApprovalChoose") }}</p>
          <v-tooltip top color="#2c3448">
            <template v-slot:activator="{ on }">
              <v-icon color="#2c3448" v-on="on">info</v-icon>
            </template>

            <div class="align-center">
              <p>{{ $t("externalTransfer.ApprovalInstructions") }}</p>
              <div v-if="!user.approverInfo.requestFaild">
                <p v-if="user.approverInfo.unit">
                  {{ $t("externalTransfer.ApproverUnit") }}
                  <span class="bold">{{ user.approverInfo.unit.name }}</span>
                </p>
                <p v-if="user.approverInfo.unit.approvers">
                  , {{ $t("externalTransfer.ApproverRanks") }}
                  <span class="bold">{{ getRanks(user.approverInfo.unit.approvers) }}</span>
                </p>
                <p class="bold">{{ whiteListText }}</p>
              </div>
            </div>
          </v-tooltip>
        </div>

        <v-checkbox
          v-if="user.approverInfo.requestFaild"
          class="space-right"
          :disabled="selectedApprovals.length !== 0"
          :label="$t('externalTransfer.IAmApprover')"
          color="#035c64"
          v-model="iAmApprover"
        ></v-checkbox>

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
      <div v-if="blockedApprover">
        <p id="cant-approve">
          {{
            $t("externalTransfer.BlockedApprover", {
              name: blockedApprover.name,
            })
          }}
        </p>
        <v-btn text small @click="$refs.support.open(blockedApprover)" id="more-info-button">
          <p>{{ $t("buttons.MoreInfo") }}</p>
        </v-btn>
      </div>

      <v-chip-group show-arrows>
        <Chips v-for="user in selectedApprovals" :key="user.id" :user="user" @remove="onRemove" />
      </v-chip-group>
    </div>

    <v-card-actions class="popup-confirm">
      <SubmitButton @click="onConfirm" :label="$t('buttons.Continue')" :disabled="disabled" />
      <TextButton @click="$emit('back')" :label="$t('buttons.Back')" />

      <v-btn text small @click="onAboutMeClick">
        <v-icon color="black">person</v-icon>
        <p>{{ $t("buttons.AboutMe") }}</p>
      </v-btn>
    </v-card-actions>

    <DropboxSupportPopup ref="support" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as usersApi from "@/api/users";

import DropboxSupportPopup from "@/components/popups/external-transfer-popup/DropboxSupportPopup";
import Chips from "@/components/shared/BaseChips";
import Autocomplete from "@/components/inputs/BaseAutocomplete";
import SubmitButton from "@/components/buttons/BaseSubmitButton";
import TextButton from "@/components/buttons/BaseTextButton";

export default {
  name: "Approval",
  components: {
    Chips,
    SubmitButton,
    Autocomplete,
    TextButton,
    DropboxSupportPopup,
  },
  props: ["networkDest"],
  data() {
    return {
      users: [],
      selectedApprovals: [],
      blockedApprover: undefined,
      isLoading: false,
      disabled: true,
      iAmApprover: false,
    };
  },
  computed: {
    ...mapGetters(["user", "whiteListText"]),
  },
  watch: {
    selectedApprovals: function(users) {
      users.length ? (this.disabled = false) : (this.disabled = true);
    },
    iAmApprover: function(value) {
      value ? (this.disabled = false) : (this.disabled = true);
    },
  },
  created() {
    this.disabled =
      this.user.approverInfo.isAdmin || (this.user.approverInfo.isApprover && !this.user.approverInfo.isBlocked)
        ? false
        : true;
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
    getRanks(ranks) {
      return ranks
        .toString()
        .split(",")
        .join(", ");
    },
    async onSelect(approver) {
      this.blockedApprover = undefined;
      this.users = [];
      if (!approver || this.isUserExists(this.selectedApprovals, approver.id)) {
        return;
      } else {
        const canApprove = await usersApi.canBeApproved(this.user.id, approver.id, this.$props.networkDest);

        if (canApprove.canApproveToUser) {
          this.selectedApprovals.push(approver);
        } else if (canApprove.cantApproveReasons) {
          this.blockedApprover = {
            name: approver.fullName,
            reasons: canApprove.cantApproveReasons,
          };
        }
      }
    },
    onRemove(item) {
      this.selectedApprovals = this.selectedApprovals.filter((user) => {
        return user.id !== item.id;
      });
    },
    isUserExists(users, id) {
      return users.some((user) => user.id === id);
    },
    onAboutMeClick() {
      usersApi.openAboutMePage();
    },
  },
};
</script>

<style scoped>
#approval-header {
  padding: 3px;
}
#cant-approve {
  color: red;
  text-align: center;
}
#more-info-button {
  margin: auto;
  display: block;
}
</style>
