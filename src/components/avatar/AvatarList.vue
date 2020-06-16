<template>
  <div>
    <div v-if="users && users.length!==0">
      <Avatar v-for="user in users" :key="user.id" :user="user" />
    </div>
    <div v-else>-</div>
  </div>
</template>

<script>
import Avatar from "./Avatar";

export default {
  name: "AvatarList",
  props: ["users"],
  components: { Avatar }
};
</script>