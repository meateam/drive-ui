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
        @select="onConfirm"
        @type="getUsersByName"
      />
    </div>
  </div>
</template>

<script>
import Autocomplete from "@/components/inputs/Autocomplete";

export default {
  name: "Approval",
  components: { Autocomplete },
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
    onConfirm(user) {
      this.$emit("continue", user);
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