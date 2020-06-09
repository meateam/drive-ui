<template>
  <v-card class="header">
    <v-container class="search">
      <Search />
    </v-container>
    <v-container class="left">
      <div id="one-aman">
        <img class="auto-margin" src="@/assets/icons/1-aman.png" />
      </div>
      <div id="info">
        <p class="auto-margin user-name">{{getUserName()}}</p>
        <!-- <Notification /> -->
        <Chat />
      </div>
    </v-container>
  </v-card>
</template>

<script>
import Chat from "./Buttons/Chat";
// import Notification from "./Buttons/Notification";
import Search from "@/components/shared/Autocomplete";
import { mapGetters } from "vuex";

export default {
  name: "Header",
  methods: {
    getUserName() {
      if (this.user) {
        const firstName = this.user.name.firstName || "";
        const lastName = this.user.name.lastName || "";
        return `${firstName} ${lastName}`;
      }
      return "";
    }
  },
  components: { Chat, Search },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style scoped>
.header {
  height: 86px;
  box-shadow: 0px 2px 4px 0 rgba(93, 111, 125, 0.1);
  background-color: #ffffff;
  direction: rtl;
}

.left {
  display: flex;
  justify-content: flex-start;
  margin-left: 0;
  flex-direction: row-reverse;
}

.search {
  position: absolute;
  margin-right: 300px;
  top: 20px;
  width: 500px;
}

#one-aman {
  width: 90px;
  height: 100%;
  display: flex;
  border-right: 1px solid #dde2ea;
}

#info {
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row-reverse;
  padding: 15px;
  border-right: 1px solid #dde2ea;
}

.container {
  height: 100%;
  padding: 0;
}

.user-name {
  padding-right: 10px;
}
</style>