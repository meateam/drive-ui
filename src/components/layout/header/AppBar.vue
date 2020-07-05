<template>
  <v-card class="header">
    <v-container class="search">
      <Search
        background="#f0f4f7"
        :placeholder="$t('autocomplete.Drive')"
        icon="search"
        :items="results"
        :isLoading="isLoading"
        @select="onSelect"
        @type="getSearchResults"
      />
    </v-container>
    <v-container class="left">
      <div id="drive">
        <img class="auto-margin drive-icon" src="@/assets/icons/drive.svg" />
      </div>
      <div id="info">
        <p class="auto-margin user-name">{{getUserName()}}</p>
        <!-- <NotificationButton /> -->
        <ChatButton />
        <TourButton />
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { search } from "@/api/search";
import ChatButton from "@/components/buttons/ChatButton";
import Search from "@/components/inputs/Autocomplete";
import TourButton from "@/components/buttons/TourButton";
// import NotificationButton from "@/components/buttons/NotificationButton";

export default {
  name: "AppBar",
  data() {
    return {
      results: [],
      isLoading: false
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
      if (this.isLoading) return;
      this.isLoading = true;
      search(query)
        .then(results => {
          results.forEach(res => (res.display = `${res.name}`));
          this.results = results;
        })
        .catch(err => {
          throw new Error(err);
        })
        .finally(() => (this.isLoading = false));
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
  max-width: 500px;
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
.user-name {
  margin: auto !important;
  padding-right: 10px;
}
.drive-icon {
  width: 40px;
}
</style>