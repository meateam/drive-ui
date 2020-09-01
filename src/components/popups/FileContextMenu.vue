<template>
  <v-menu
    v-model="showMenu"
    :position-x="x"
    :position-y="y"
    max-width="160"
    absolute
    offset-y
    id="menu"
  >
    <v-list color="#035c64" id="right-click-popup">
      <InfoButton />
      <PreviewButton />
      <DownloadButton />
      <DeleteButton />
      <MoveToButton />
      <EditButton />
      <OnlineEditButton />
      <ShareButton />
      <ExternalTransferButton />
    </v-list>
  </v-menu>
</template>

<script>
import DownloadButton from "@/components/buttons/DownloadButton";
import ExternalTransferButton from "@/components/buttons/ExternalTransferButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import MoveToButton from "@/components/buttons/MoveToButton";
import OnlineEditButton from "@/components/buttons/OnlineEditButton";
import EditButton from "@/components/buttons/EditButton";
import InfoButton from "@/components/buttons/InfoButton";
import PreviewButton from "@/components/buttons/PreviewButton";
import ShareButton from "@/components/buttons/ShareButton";

export default {
  name: "FileMenu",
  components: {
    DownloadButton,
    ShareButton,
    ExternalTransferButton,
    MoveToButton,
    DeleteButton,
    InfoButton,
    OnlineEditButton,
    EditButton,
    PreviewButton,
  },
  data() {
    return {
      showMenu: false,
      x: 0,
      y: 0,
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
  },
};
</script>

<style scoped>
#right-click-popup {
  padding: 0;
}
</style>