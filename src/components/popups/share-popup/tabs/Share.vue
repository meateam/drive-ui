<template>
  <div>
    <p class="popup-text">{{ $t("share.DriveChoose") }}</p>
    <div class="space-between" @click="hideAdvancedSearchOptions">
      <Autocomplete
        icon
        background="white"
        :placeholder="$t('autocomplete.Users')"
        :items="users"
        :isLoading="isLoading"
        :minLength="2"
        :noResult="'NoResultAdvancedSearch'"
        @select="onUserSelect"
        @type="getUsersByContent"
      />

      <div class="select-container">
        <Select
          :items="roles"
          :value="roles[0]"
          background="transparent"
          @change="onRoleSelect"
          :placeholder="$t('share.ChoosePermission')"
        />
      </div>
    </div>

    <div id="advancedSearchContainer">
      <div id="advancedSearchTitlesContainer">
        <a
          id="advancedSearch"
          @click="onAdvancedSearch"
        >{{ $t('share.AdvancedSearch') }}</a>
        <div>
          <AdvancedSearchChips v-if="advancedSearchSelection"
          :searchBy="$t(`share.AdvancedSearchChoices.${advancedSearchSelection}`)"
          @remove="onRemoveAdvancedSearch"
        />
        </div>
      </div>
      <div
        :class="[displayAdvancedSearchOptions ? 'd-block' : 'd-none']"
        id="advancedSearchButtons"
      >
        <RadioButtons
          :value="advancedSearchSelection"
          :radioGroup="advancedSearchOptions"
          @change="changeAdvancedSearchSelection"
        />
      </div>
    </div>

    <div id="chips">
      <v-chip-group show-arrows>
        <Chips
          v-for="user in selectedUsers"
          :key="user.id"
          :user="user"
          @remove="onRemove"
        />
      </v-chip-group>
    </div>

    <v-card-actions class="popup-confirm">
      <SubmitButton
        @click="onConfirm"
        :label="$t('buttons.Share')"
        :disabled="disabled"
      />
      <TextButton
        v-if="files.length === 1"
        @click="$emit('back')"
        :label="$t('buttons.EditPermission')"
      />
    </v-card-actions>
  </div>
</template>

<script>
import * as usersApi from "@/api/users";
import Chips from "@/components/shared/BaseChips";
import AdvancedSearchChips from "@/components/shared/AdvancedSearchChips";
import Autocomplete from "@/components/inputs/BaseAutocomplete";
import SubmitButton from "@/components/buttons/BaseSubmitButton";
import Select from "@/components/inputs/BaseSelect";
import TextButton from "@/components/buttons/BaseTextButton";
import RadioButtons from "@/components/buttons/AdvancedSearchRadioButtons";
import { AdvancedSearchToEnum } from "@/utils/convertAdvancedSearchToEnum";
import { AdvancedSearchEnum } from "@/utils/advancedSearchEnum";

export default {
  name: "SharePopup",
  data() {
    return {
      dialog: false,
      selectedUsers: [],
      users: [],
      role: "READ",
      disabled: true,
      isLoading: false,
      roles: [
        { value: "READ", text: this.$t("share.role.READ") },
        { value: "WRITE", text: this.$t("share.role.WRITE") },
      ],
      advancedSearchOptions: Object.keys(
        this.$t("share.AdvancedSearchChoices")
      ),
      advancedSearchSelection: null,
      displayAdvancedSearchOptions: false,
    };
  },
  components: {
    Chips,
    AdvancedSearchChips,
    SubmitButton,
    Autocomplete,
    Select,
    TextButton,
    RadioButtons,
  },
  props: ["files"],
  watch: {
    selectedUsers: function (users) {
      this.role && users.length
        ? (this.disabled = false)
        : (this.disabled = true);
    },
  },
  methods: {
    getUsersByContent(content) {
      if (this.isLoading) return;
      this.isLoading = true;
      const searchBy = !this.advancedSearchSelection
        ? AdvancedSearchEnum.SearchByName
        : AdvancedSearchToEnum(this.advancedSearchSelection);
      usersApi
        .getUsers(content, searchBy)
        .then((users) => {
          this.users = users;
        })
        .finally(() => (this.isLoading = false));
    },
    changeAdvancedSearchSelection(radioGroupSelection) {
      this.advancedSearchSelection = radioGroupSelection;
    },
    onUserSelect(user) {
      this.users = [];
      if (!user) return;
      else if (!this.isUserExists(this.selectedUsers, user.id))
        this.selectedUsers.push(user);
    },
    onRoleSelect(role) {
      this.role = role;
      this.role && this.selectedUsers.length
        ? (this.disabled = false)
        : (this.disabled = true);
    },
    onRemove(item) {
      this.selectedUsers = this.selectedUsers.filter((user) => {
        return user.id !== item.id;
      });
    },
    onRemoveAdvancedSearch() {
      this.advancedSearchSelection = null;
    },
    onAdvancedSearch() {
      this.displayAdvancedSearchOptions = !this.displayAdvancedSearchOptions
    },
    hideAdvancedSearchOptions() {
      this.displayAdvancedSearchOptions = false;
    },
    isUserExists(users, id) {
      return users.some((user) => user.id === id);
    },
    onConfirm() {
      const shareObject = {
        files: this.files,
        users: this.selectedUsers,
        role: this.role,
      };

      this.selectedUsers = [];
      this.$emit("share", shareObject);
    },
  },
};
</script>

<style scoped>
#advancedSearchContainer {
  margin-top: -20px;
  height: 110px;
}
#advancedSearchButtons {
  margin-top: -35px;
}
#advancedSearchButtons > * {
  margin-right: 10px;
  padding-top: 0;
}
#chips {
  min-height: 60px;
}
#advancedSearch {
  height: 20px;
  z-index: 1000;
  font-size: smaller;
  color: #1976d2 !important;
  text-decoration: underline;
  padding-left: 20px;
  margin-right: 24px;
  margin-top: 3px;
}
#advancedSearchTitlesContainer {
  display: flex;
  min-height: 50px;
}
</style>