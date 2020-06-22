<template>
  <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y id="menu">
    <v-list color="#357e6f">
      <v-list-item>
        <Download @click="downloadFile" />
      </v-list-item>
      <v-list-item>
        <Share @click="$refs.share.open()" />
      </v-list-item>
      <v-list-item>
        <Delete @click="downloadFile" />
      </v-list-item>
      <v-list-item>
        <Move />
      </v-list-item>
      <v-list-item>
        <Info />
      </v-list-item>
      <v-list-item>
        <Edit />
      </v-list-item>
    </v-list>
    <SharePopup ref="share" :files="[file]" />
  </v-menu>
</template>

<script>
import Download from "@/components/buttons/Download";
import Delete from "@/components/buttons/Delete";
import Move from "@/components/buttons/Move";
import Edit from "@/components/buttons/Edit";
import Info from "@/components/buttons/Info";
import Share from "@/components/buttons/Share";
import SharePopup from "@/components/popups/share/Share";

export default {
  name: "FileMenu",
  props: ["file"],
  components: { Download, Share, SharePopup, Move, Delete, Info, Edit },
  data() {
    return {
      showMenu: false,
      x: 0,
      y: 0
    };
  },
  methods: {
    show(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
    downloadFile() {
      this.$store.dispatch("downloadFile", this.file.id);
    },
    deleteFile() {
      this.$store.dispatch("deleteFiles", this.file.id);
    }
  }
};
</script>

<style scoped>
</style>