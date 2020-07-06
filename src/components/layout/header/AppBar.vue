<template>
  <v-card class="header">
    <div class="search">
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
    <div class="left">
      <div id="drive">
        <img class="auto-margin drive-icon" src="@/assets/icons/drive.svg" />
      </div>
      <div id="info">
        <p class="auto-margin user-name">{{getUserName()}}</p>
        <ChatButton />
        <TourButton />
      </div>
      <v-progress-circular v-if="isLoading" id="loading" :size="40" :width="3" color="#357e6f" indeterminate></v-progress-circular>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { search } from "@/api/search";
import ChatButton from "@/components/buttons/ChatButton";
import Search from "@/components/inputs/Autocomplete";
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
        path: result.parent ? "/folders" : "/my-drive",
        query: { id: result.parent }
      });
    }
  },
  components: { ChatButton, Search, TourButton },
  computed: {
    ...mapGetters(["user", "isLoading"])
  }
};
</script>

<style scoped>
.header {
  height: 86px;
  display: flex;
  box-shadow: 0px 2px 4px 0 rgba(93, 111, 125, 0.1);
  background-color: #ffffff;
  justify-content: space-between;
  margin-right: 256px;
}
.left {
  margin-left: 0;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
}
.search {
  margin: auto 15px;
  width: 470px;
  padding-top: 20px;
}
#drive {
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
#loading {
  margin: auto 15px;
}
.user-name {
  margin: auto !important;
  padding-right: 10px;
}
.drive-icon {
  width: 40px;
}
</style>