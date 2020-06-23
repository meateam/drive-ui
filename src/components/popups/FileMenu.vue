<template>
  <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y id="menu">
    <v-list color="#357e6f" id="right-click-popup">
      <Download />
      <Share />
      <Delete />
      <Move />
      <Info />
      <Edit />
    </v-list>
  </v-menu>
</template>

<script>
import Download from "@/components/buttons/Download";
import Delete from "@/components/buttons/Delete";
import Move from "@/components/buttons/Move";
import Edit from "@/components/buttons/Edit";
import Info from "@/components/buttons/Info";
import Share from "@/components/buttons/Share";

export default {
  name: "FileMenu",
  components: { Download, Share, Move, Delete, Info, Edit },
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
    }
  }
};
</script>

<style scoped>
#right-click-popup {
  padding: 0;
}
</style>