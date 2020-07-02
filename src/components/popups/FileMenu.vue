<template>
  <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y id="menu">
    <v-list color="#357e6f" id="right-click-popup">
      <DownloadButton />
      <ShareButton />
      <DeleteButton />
      <MoveButton />
      <InfoButton />
      <EditButton />
      <PreviewButton />
    </v-list>
  </v-menu>
</template>

<script>
import DownloadButton from "@/components/buttons/DownloadButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import MoveButton from "@/components/buttons/MoveButton";
import EditButton from "@/components/buttons/EditButton";
import InfoButton from "@/components/buttons/InfoButton";
import PreviewButton from "@/components/buttons/PreviewButton";
import ShareButton from "@/components/buttons/ShareButton";

export default {
  name: "FileMenu",
  components: {
    DownloadButton,
    ShareButton,
    MoveButton,
    DeleteButton,
    InfoButton,
    EditButton,
    PreviewButton
  },
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