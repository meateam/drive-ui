<template>
  <div>
    <div
      v-if="
        user.approverInfos[networkDest] &&
        user.approverInfos[networkDest].isBlocked
      "
    >
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
      <v-row no-gutters>
        <v-col cols="12" md="12">
          <p class="popup-text">{{ $t("share.DriveChoose") }}</p>
        </v-col>
        <v-col cols="12" md="12">
          <v-row no-gutters>
            <v-col cols="12" md="12" v-if="networkDest === 'CTS'">
              <v-select
                background-color="white"
                rounded
                :label="$t('externalTransfer.SearchBy')"
                outlined
                dense
                v-model="searchSelection"
                :items="searchOptions"
              ></v-select>
            </v-col>
            <v-col cols="12" md="12">
              <Autocomplete
                icon
                background="white"
                :placeholder="$t('autocomplete.Users')"
                :items="users"
                :isLoading="isLoading"
                :minLength="2"
                @select="onSelect"
                @type="getExternalUsers"
                :validation="advancedSearchValidation()"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div @click="hideAdvancedSearchOptions"></div>
      <!-- <div id="advancedSearchContainer" v-if="networkDest === 'CTS'">
        <div id="advancedSearchTitlesContainer">
          <a id="advancedSearch" @click="onAdvancedSearch">{{
            $t("share.AdvancedSearch")
          }}</a>
          <div>
            <AdvancedSearchChips
              v-if="advancedSearchSelection"
              :searchBy="
                $t(`share.AdvancedSearchChoices.${advancedSearchSelection}`)
              "
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
            :radioGroup="['advancedSearchOptions']"
            @change="changeAdvancedSearchSelection"
          />
        </div>
      </div> -->
      <v-chip-group show-arrows>
        <Chips
          v-for="user in selectedUsers"
          :key="user.id"
          :user="user"
          @remove="onRemove"
        />
      </v-chip-group>
      <v-card-actions class="popup-confirm">
        <SubmitButton
          @click="onConfirm"
          :label="$t('buttons.Continue')"
          :disabled="disabled"
        />
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
import { SearchToEnum } from "@/utils/convertAdvancedSearchToEnum";
import { validationAdvancedSearchFactory } from "@/utils/advancedSearchValidation";

export default {
  name: "Destination",
  components: {
    Chips,
    SubmitButton,
    Autocomplete,
    TextButton,
  },
  props: { networkDest: String, reset: Boolean },
  data() {
    return {
      selectedUsers: [],
      users: [],
      isLoading: false,
      disabled: true,
      searchOptions: [
        this.$t("share.searchOptions.name"),
        this.$t("share.searchOptions.id"),
      ],
      searchSelection: null,
      displayAdvancedSearchOptions: false,
    };
  },
  computed: {
    ...mapGetters(["user", "currentMailOrT"]),
  },
  created() {
    this.searchSelection = this.searchOptions[0];
  },
  watch: {
    selectedUsers: function (users) {
      users.length ? (this.disabled = false) : (this.disabled = true);
    },
    networkDest: function (newDest, oldDest) {
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
    // changeAdvancedSearchSelection(radioGroupSelection) {
    //   this.advancedSearchSelection = radioGroupSelection;
    // },
    // onRemoveAdvancedSearch() {
    //   this.advancedSearchSelection = null;
    // },
    // onAdvancedSearch() {
    //   this.displayAdvancedSearchOptions = !this.displayAdvancedSearchOptions;
    // },
    advancedSearchValidation() {
      return validationAdvancedSearchFactory(
        SearchToEnum(this.searchSelection)
      );
    },
    hideAdvancedSearchOptions() {
      this.displayAdvancedSearchOptions = false;
    },
    onBack() {
      this.users = [];
      this.$emit("back");
    },
    getExternalUsers(content) {
      if (this.isLoading) return;
      this.isLoading = true;

      switch (this.searchSelection) {
        case this.$t("share.searchOptions.name"): {
          usersApi
            .searchExternalUsersByName(content, this.networkDest)
            .then((users) => (this.users = users))
            .finally(() => (this.isLoading = false));
          break;
        }
        case this.$t("share.searchOptions.id"): {
          const searchBy = SearchToEnum(this.searchSelection);
          usersApi
            .getUsers(content, searchBy)
            .then((users) => {
              this.users = users;
            })
            .finally(() => (this.isLoading = false));
          break;
        }
      }
    },
    onAboutMeClick() {
      usersApi.openAboutMePage(this.networkDest);
    },
    onSelect(user) {
      this.users = [];
      if (!user || this.isUserExists(this.selectedUsers, user.id)) {
        return;
      } else {
        if (this.advancedSearchSelection && this.networkDest == "CTS") {
          console.log(
            "in advance search: user.id = " + this.currentMailOrT + " !"
          );
          user.id = this.currentMailOrT;
        }
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
      this.advancedSearchSelection = null;
      this.displayAdvancedSearchOptions = false;
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