<template>
  <div>
    <!-- if the user is admin -->
    <div v-if="user.approverInfos[networkDest] && user.approverInfos[networkDest].isAdmin">
      <v-row class="ma-1" no-gutters justify="center">
        <p class="pa-0 popup-text align-center">
          {{ $t("externalTransfer.CanApprove") }}
        </p>
        <v-btn text small @click="onAboutMeClick">
          <p>{{ $t("buttons.AboutMe") }}</p>
        </v-btn>
      </v-row>
    </div>

    <!-- if the user has no unit and he isnt approver -->
    <div
      v-else-if="
        user.approverInfos[networkDest] &&
          user.approverInfos[networkDest].noUnit &&
          !user.approverInfos[networkDest].isApprover
      "
    >
      <v-row class="ma-1" no-gutters justify="center">
        <p class="pa-0 popup-text align-center">
          {{ $t("externalTransfer.NoUnit") }}
        </p>

        <v-btn text small @click="onAboutMeClick">
          <p>{{ $t("buttons.AboutMe") }}</p>
        </v-btn>
      </v-row>
    </div>

    <!-- if the user is blocked -->
    <div v-else-if="user.approverInfos[networkDest] && user.approverInfos[networkDest].isBlocked">
      <v-row class="ma-1" no-gutters justify="center">
        <p class="pa-0 popup-text align-center">
          {{ $t("externalTransfer.IsBlocked") }}
        </p>
        <v-btn text small @click="onAboutMeClick">
          <p>{{ $t("buttons.AboutMe") }}</p>
        </v-btn>
      </v-row>
    </div>

    <!-- if the user is approver -->
    <div v-else-if="user.approverInfos[networkDest] && user.approverInfos[networkDest].isApprover">
      <v-row class="ma-1" no-gutters justify="center">
        <p class="pa-0 popup-text align-center">
          {{ $t("externalTransfer.CanApprove") }}
        </p>
        <v-btn text small @click="onAboutMeClick">
          <p>{{ $t("buttons.AboutMe") }}</p>
        </v-btn>
      </v-row>
    </div>

    <!-- else -->
    <div v-else>
      <div>
        <div id="approval-header">
          <v-row class="ma-1 popup-text" no-gutters justify="center" align="center">
            <p>{{ $t("externalTransfer.ApprovalChoose") }}</p>
            <v-spacer />
            <v-btn class="mx-1" rounded color="#2c3448" dark x-small @click="onAboutMeClick">
              <v-icon small>person</v-icon>
              <p>{{ $t("buttons.AboutMe") }}</p>
            </v-btn>

            <v-tooltip top color="#2c3448">
              <template v-slot:activator="{ on }">
                <v-icon color="#2c3448" v-on="on">info</v-icon>
              </template>

              <div class="align-center">
                <p>{{ $t("externalTransfer.ApprovalInstructions") }}</p>
                <div v-if="user.approverInfos[networkDest] && !user.approverInfos[networkDest].requestFaild">
                  <!-- the approver must be in unit msg -->
                  <p v-if="user.approverInfos[networkDest] && user.approverInfos[networkDest].unit.name">
                    {{ $t("externalTransfer.ApproverUnit") }}
                    <span class="bold">{{ user.approverInfos[networkDest].unit.name }}</span>
                  </p>

                  <!-- the approver must be in unit msg -->
                  <p v-if="user.approverInfos[networkDest] && user.approverInfos[networkDest].unit.approvers">
                    {{ $t("externalTransfer.ApproverRanks") }}
                    <span
                      v-for="(rank, index) in getRanks(user.approverInfos[networkDest].unit.approvers)"
                      v-bind:key="index"
                      class="bold"
                      >{{ rank }}</span
                    >
                  </p>
                  <p class="bold">{{ whiteListText }}</p>
                </div>
              </div>
            </v-tooltip>
          </v-row>
        </div>

        <v-checkbox
          v-if="user.approverInfos[networkDest] && user.approverInfos[networkDest].requestFaild"
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
  props: {
    networkDest: String,
    reset: Boolean,
  },
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
    reset() {
      this.users = [];
      this.selectedApprovals = [];
      this.blockedApprover = undefined;
      this.isLoading = false;
      this.iAmApprover = false;

      this.disabled =
        this.networkDest == undefined ||
        !(
          this.user.approverInfos[this.networkDest].isAdmin ||
          (this.user.approverInfos[this.networkDest].isApprover && !this.user.approverInfos[this.networkDest].isBlocked)
        );
    },
    networkDest: function() {
      this.disabled =
        this.networkDest == undefined ||
        !(
          this.user.approverInfos[this.networkDest].isAdmin ||
          (this.user.approverInfos[this.networkDest].isApprover && !this.user.approverInfos[this.networkDest].isBlocked)
        );
    },
    iAmApprover: function(value) {
      value ? (this.disabled = false) : (this.disabled = true);
    },
  },
  created() {
    this.disabled =
      this.networkDest == undefined ||
      !(
        this.user.approverInfos[this.networkDest].isAdmin ||
        (this.user.approverInfos[this.networkDest].isApprover && !this.user.approverInfos[this.networkDest].isBlocked)
      )
        ? true
        : false;
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
        this.disabled = true;
        return;
      } else {
        const canApprove = await usersApi.canBeApproved(this.user.id, approver.id, this.networkDest);

        if (canApprove.canApproveToUser) {
          this.selectedApprovals.push(approver);
          this.disabled = false;
        } else if (canApprove.cantApproveReasons) {
          this.blockedApprover = {
            name: approver.fullName,
            reasons: canApprove.cantApproveReasons,
          };
          if (this.selectedApprovals.length == 0) {
            this.disabled = true;
          }
        }
      }
    },
    onRemove(item) {
      this.selectedApprovals = this.selectedApprovals.filter((user) => {
        return user.id !== item.id;
      });
      if (this.selectedApprovals.length == 0) {
        this.disabled = true;
      }
    },
    isUserExists(users, id) {
      return users.some((user) => user.id === id);
    },
    onAboutMeClick() {
      usersApi.openAboutMePage(this.networkDest);
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
