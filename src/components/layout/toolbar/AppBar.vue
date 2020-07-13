<template>
  <v-app-bar app id="header" color="white" height="86px">
    <div id="search-input">
      <Search
        background="#f0f4f7"
        :placeholder="$t('autocomplete.Drive')"
        icon="search"
        :items="results"
        :isLoading="isSearchLoading"
        @select="onSelect"
        @type="getSearchResults"
      />
    </div>
    <v-spacer></v-spacer>
    <div id="left">
      <div v-if="loadingFiles.length">
        <LoadingFiles :files="loadingFiles" />
      </div>
      <v-divider vertical light></v-divider>
      <div id="info">
        <TourButton />
        <ChatButton />
        <p id="user-name">{{getUserName()}}</p>
      </div>
      <v-divider vertical light></v-divider>
      <div id="drive-logo">
        <router-link to="/my-drive" class="auto-margin">
          <img id="drive-icon" src="@/assets/icons/drive.svg" />
        </router-link>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import { search } from "@/api/search";
import { fileTypes } from "@/utils/config";
import ChatButton from "@/components/buttons/ChatButton";
import LoadingFiles from "@/components/shared/BaseLoadingFiles";
import Search from "@/components/inputs/BaseAutocomplete";
import TourButton from "@/components/buttons/TourButton";

export default {
  name: "AppBar",
  data() {
    return {
      results: [],
      isSearchLoading: false
    };
  },
  methods: {
    getUserName() {
      if (this.user) {
        const firstName = this.user.name.firstName || "";
        const lastName = this.user.name.lastName || "";
        return `${firstName} ${lastName}`;
      }
      return "";
    },
    isFolder(type) {
      return type === fileTypes.folder;
    },
    getSearchResults(query) {
      if (this.isSearchLoading) return;
      this.isSearchLoading = true;
      search(query)
        .then(results => {
          results.forEach(res => (res.display = `${res.name}`));
          this.results = results;
        })
        .catch(err => {
          throw new Error(err);
        })
        .finally(() => (this.isSearchLoading = false));
    },
    onSelect(result) {
      this.$router.push({
        path:
          result.parent || this.isFolder(result.type)
            ? "/folders"
            : "/my-drive",
        query: { id: this.isFolder(result.type) ? result.id : result.parent }
      });
    }
  },
  components: { ChatButton, Search, TourButton, LoadingFiles },
  computed: {
    ...mapGetters(["user", "loadingFiles"])
  }
};
</script>

<style scoped>
#header {
  box-shadow: 0px 2px 4px 0 rgba(93, 111, 125, 0.1);
  justify-content: space-between;
}
#left {
  height: 100%;
  line-height: 100%;
  display: flex;
}
#search-input {
  margin: auto 15px;
  width: 470px;
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