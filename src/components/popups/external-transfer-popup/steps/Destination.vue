<template>
  <div>
    <div v-if="user.approverInfos[networkDest] && user.approverInfos[networkDest].isBlocked">
      <p class="popup-text align-center">
        {{ $t("externalTransfer.IsBlocked") }}
      </p>

      <v-row no-gutters align="center" justify="center">
        <v-btn text small @click="onAboutMeClick" id="more-info-button">
          <p>{{ $t("buttons.MoreInfo") }}</p>
        </v-btn>
      </v-row>
    </div>
    <div v-else>
      <p class="popup-text">{{ $t("share.DriveChoose") }}</p>
      <Autocomplete
        icon
        background="white"
        :placeholder="$t('autocomplete.Users')"
        :items="users"
        :isLoading="isLoading"
        :minLength="2"
        @select="onSelect"
        @type="getExternalUsersByName"
      />
      <v-chip-group show-arrows>
        <Chips v-for="user in selectedUsers" :key="user.id" :user="user" @remove="onRemove" />
      </v-chip-group>
      <v-card-actions class="popup-confirm d-flex justify-space-between mb-6">
        <SubmitButton @click="onConfirm" :label="$t('buttons.Continue')" :disabled="disabled" />
        <TextButton @click="$emit('back')" :label="$t('buttons.Back')" />
      </v-card-actions>
    </div>
  </div>
</template>

<script>
import * as usersApi from "@/api/users";
import Chips from "@/components/shared/BaseChips";
import Autocomplete from "@/components/inputs/BaseAutocomplete";
import SubmitButton from "@/components/buttons/BaseSubmitButton";
import TextButton from "@/components/buttons/BaseTextButton";
import { mapGetters } from "vuex";

export default {
  name: "Destination",
  components: { Chips, SubmitButton, Autocomplete, TextButton },
  props: { networkDest: String, reset: Boolean },
  data() {
    return {
      selectedUsers: [],
      users: [],
      isLoading: false,
      disabled: true,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  watch: {
    selectedUsers: function(users) {
      users.length ? (this.disabled = false) : (this.disabled = true);
    },
    networkDest: function(newDest, oldDest) {
      if (newDest != oldDest) this.selectedUsers = [];
    },
    reset() {
      this.selectedUsers = [];
      this.users = [];
      this.isLoading = false;
      this.disabled = true;
    },
  },
  methods: {
    onBack() {
      this.users = [];
      this.$emit("back");
    },
    getExternalUsersByName(name) {
      if (this.isLoading) return;
      this.isLoading = true;
      usersApi
        .searchExternalUsersByName(name, this.networkDest)
        .then((users) => (this.users = users))
        .finally(() => (this.isLoading = false));
    },
    onAboutMeClick() {
      usersApi.openAboutMePage(this.networkDest);
    },
    onSelect(user) {
      this.users = [];
      if (!user || this.isUserExists(this.selectedUsers, user.id)) {
        return;
      } else {
        this.selectedUsers.push(user);
      }
    },
    onRemove(item) {
      this.selectedUsers = this.selectedUsers.filter((user) => {
        return user.id !== item.id;
      });
    },
    isUserExists(users, id) {
      return users.some((user) => user.id === id);
    },
    onConfirm() {
      this.$emit(
        "continue",
        this.selectedUsers.map((user) => {
          return { id: user.id, full_name: user.fullName };
        })
      );
    },
  },
};
</script>
