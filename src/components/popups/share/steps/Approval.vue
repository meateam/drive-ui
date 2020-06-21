<template>
  <div>
    <div>
      <p id="choose">{{$t('externalShare.ApprovalChoose')}}</p>
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
    <v-card-actions class="popup-confirm">
      <Confirm @click="onConfirm" :label="$t('buttons.Continue')" />
    </v-card-actions>
  </div>
</template>

<script>
import Confirm from "@/components/buttons/Confirm";
import Autocomplete from "@/components/inputs/Autocomplete";

export default {
  name: "Approval",
  components: { Confirm, Autocomplete },
  props: ["files"],
  data() {
    return {
      users: [],
      isLoading: false,
      approval: undefined
    };
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
    onSelect(user) {
      this.approval = user;
    },
    onConfirm() {
      this.$emit("continue", this.approval);
    }
  }
};
</script>

<style scoped>
#choose {
  font-size: 18px;
  padding-bottom: 15px;
}
</style>