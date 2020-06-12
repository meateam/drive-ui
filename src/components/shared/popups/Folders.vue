<template>
  <v-menu v-model="menu">
    <v-list>
      <router-link
        v-for="folder in folders"
        :key="folder.id"
        :to="{ path: '/folders', query: { id: folder.id }}"
      >
        <v-list-item>
          <v-list-item-title>{{ folder.name }}</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Folders",
  computed: {
    ...mapGetters(["folders"])
  },
  data() {
    return {
      menu: false
    };
  },
  methods: {
    open() {
      this.menu = true;
    }
  }
};
</script>

<style scoped>
</style>