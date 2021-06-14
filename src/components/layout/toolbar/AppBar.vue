<template>
  <v-app-bar app id="header" color="white" height="86px">
    <div id="search-input">
      <SearchInput @onSelectItem="onSelect" @openItemLocation="openItemLocation" />
    </div>
    <v-spacer></v-spacer>
    <div id="left">
      <Progress :show="isLoading" color="#035c64" :size="60" />

      <div v-if="loadingFiles.length">
        <LoadingFiles :files="loadingFiles" />
      </div>
      <v-divider vertical light></v-divider>
      <div id="info">
        <ChatButton />
        <p id="user-name">{{ getUserName() }}</p>
      </div>
      <v-divider vertical light></v-divider>
      <div id="drive-logo">
        <router-link to="/my-drive" class="auto-margin">
          <img id="drive-icon" src="@/assets/icons/drive.svg" />
        </router-link>
      </div>
    </div>
    <Preview ref="preview" />
  </v-app-bar>
</template>

<script>
import SearchInput from "@/components/layout/toolbar/search/SearchInput";
import Progress from "@/components/shared/BaseProgress";
import ChatButton from "@/components/buttons/ChatButton";
import LoadingFiles from "@/components/shared/BaseLoadingFiles";
import Preview from "@/components/popups/Preview";
import { mapGetters } from "vuex";
import { isFolder } from "@/utils/isFolder";

export default {
  name: "AppBar",
  components: { ChatButton, LoadingFiles, Preview, Progress, SearchInput },
  methods: {
    getUserName() {
      if (this.user) {
        const firstName = this.user.name.firstName || "";
        const lastName = this.user.name.lastName || "";
        return `${firstName} ${lastName}`;
      }
      return "";
    },
    onSelect(result) {
      if (this.$router.history.current.query.id !== result.id) {
        if (isFolder(result.type)) {
          this.$router.push({ path: "/folders", query: { id: result.id } });
        } else {
          this.$refs.preview.open(result);
        }
      }
    },
    openItemLocation(result) {
      if (this.$router.history.current.query.id !== result.id) {
        if (isFolder(result.type)) {
          this.$router.push({ path: "/folders", query: { id: result.id } });
        } else {
          this.$router.push({ path: "/file", query: { id: result.id } });
        }
      }
    },
  },
  computed: {
    ...mapGetters(["user", "loadingFiles", "isLoading"]),
  },
};
</script>

<style scoped>
#header {
  justify-content: space-between;
}
#left {
  height: 100%;
  line-height: 100%;
  display: flex;
}
#search-input {
  margin: auto 15px;
  width: 650px;
  padding-top: 20px;
}
#info {
  display: flex;
  justify-content: space-around;
  padding: 15px;
}
#user-name {
  align-self: center;
  padding-right: 10px;
  font-size: 18px;
}
#drive-logo {
  width: 90px;
  display: flex;
}
#drive-icon {
  width: 60px;
  -webkit-animation: rotate-scale-up 0.65s linear both;
  animation: rotate-scale-up 0.65s linear both;
}

@-webkit-keyframes rotate-scale-up {
  0% {
    -webkit-transform: scale(1) rotateZ(0);
    transform: scale(1) rotateZ(0);
  }
  50% {
    -webkit-transform: scale(2) rotateZ(180deg);
    transform: scale(2) rotateZ(180deg);
  }
  100% {
    -webkit-transform: scale(1) rotateZ(360deg);
    transform: scale(1) rotateZ(360deg);
  }
}
@keyframes rotate-scale-up {
  0% {
    -webkit-transform: scale(1) rotateZ(0);
    transform: scale(1) rotateZ(0);
  }
  50% {
    -webkit-transform: scale(2) rotateZ(180deg);
    transform: scale(2) rotateZ(180deg);
  }
  100% {
    -webkit-transform: scale(1) rotateZ(360deg);
    transform: scale(1) rotateZ(360deg);
  }
}
</style>
