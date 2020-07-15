<template>
  <div>
    <router-view v-if="user" />
    <div v-else>
      <img id="yesodot" src="@/assets/images/yesodot.svg" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style scoped>
@import "./styles/global.css";
#loading {
  position: absolute;
  top: calc(50vh - 250px);
  right: calc(50% - 100px);
}
</style>