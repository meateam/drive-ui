<template>
  <div>
    <v-list two-line max-height="300" min-height="200" color="transparent" v-if="users.length">
      <v-list-item v-for="user in users" :key="user.id">
        <v-list-item-avatar :color="getColor(user.id)">{{`${user.firstName[0]}${user.lastName[0]}`}}</v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="user.fullName"></v-list-item-title>
          <v-list-item-subtitle v-text="user.mail"></v-list-item-subtitle>
        </v-list-item-content>

        <div class="flex action-container">
          <div id="delete-container">
            <IconButton
              icon="black-delete.svg"
              :tooltip="$t('buttons.RemoveShare')"
              @click="onPermissionRemove(user.id)"
            />
          </div>

          <div class="select-container">
            <Select
              :items="roles"
              :value="getRole(user.role)"
              background="transparent"
              @change="onRoleChange($event, user.id)"
              :placeholder="$t('share.ChoosePermission')"
            />
          </div>
        </div>
      </v-list-item>
    </v-list>
    <div v-else>{{$t('share.NoPermissions')}}</div>

    <v-card-actions class="popup-confirm top-space">
      <TextButton @click="$emit('share')" :label="$t('buttons.AddShare')" />
    </v-card-actions>
  </div>
</template>

<script>
import { getColor } from "@/utils/getColor";
import Select from "@/components/inputs/BaseSelect";
import TextButton from "@/components/buttons/BaseSubmitButton";
import IconButton from "@/components/buttons/BaseIconButton";

export default {
  name: "EditPermissions",
  props: ["users"],
  components: { TextButton, Select, IconButton },
  data() {
    return {
      roles: [
        { value: "READ", text: this.$t("share.role.READ") },
        { value: "WRITE", text: this.$t("share.role.WRITE") },
      ],
    };
  },
  methods: {
    getColor(text) {
      return getColor(text);
    },
    getRole(role) {
      return this.roles.filter((r) => r.value === role)[0];
    },
    onRoleChange(role, userID) {
      this.$emit("edit", {
        role,
        userID,
      });
    },
    onPermissionRemove(userID) {
      this.$emit("remove", { userID });
    },
  },
};
</script>

<style scoped>
.v-list--two-line .v-list-item,
.v-list-item--two-line {
  min-height: 50px;
  height: 50px;
  line-height: 50px;
}
.v-list {
  overflow: auto;
}
.action-container {
  margin: auto;
  flex-direction: row-reverse;
}
.select-container {
  width: 120px;
  margin-top: 5px;
}
</style>