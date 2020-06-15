<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel expand>
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
    </v-expansion-panel>
  </v-expansion-panels>
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
      panel: []
    };
  },
  methods: {
    toggle() {
      this.panel = [0];
    }
  }
};
</script>

<style scoped>
</style>