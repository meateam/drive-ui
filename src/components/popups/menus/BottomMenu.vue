<template>
  <div id="action-bar" v-if="chosenFiles.length">
    <InfoButton :icon="true" />
    <PreviewButton :icon="true" />
    <DownloadButton :icon="true" />
    <DeleteButton :icon="true" />
    <FavoriteButton :icon="true" />
    <MoveToButton :icon="true" />
    <OnlineEditButton :icon="true" />
    <LocalEditButton :icon="true" />
    <EditButton :icon="true" />
    <ShareButton :icon="true" />
    <ExternalTransferButton :icon="true" />
    <CopyToClipboardButton :icon="true" />
  </div>
</template>

<script>
import DownloadButton from "@/components/buttons/DownloadButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import MoveToButton from "@/components/buttons/MoveToButton";
import EditButton from "@/components/buttons/EditButton";
import OnlineEditButton from "@/components/buttons/OnlineEditButton";
import LocalEditButton from "@/components/buttons/LocalEditButton";
import InfoButton from "@/components/buttons/InfoButton";
import PreviewButton from "@/components/buttons/PreviewButton";
import ShareButton from "@/components/buttons/ShareButton";
import ExternalTransferButton from "@/components/buttons/ExternalTransferButton";
import FavoriteButton from "@/components/buttons/FavoriteButton";
import CopyToClipboardButton from "@/components/buttons/CopyToClipboardButton";

export default {
  name: "BottomMenu",
  props: ["chosenFiles"],
  components: {
    DownloadButton,
    OnlineEditButton,
    LocalEditButton,
    ShareButton,
    MoveToButton,
    DeleteButton,
    InfoButton,
    EditButton,
    ExternalTransferButton,
    PreviewButton,
    FavoriteButton,
    CopyToClipboardButton,
  },
};
</script>

<style scoped>
#action-bar {
  width: fit-content;
  padding: 8px 20px 8px 20px;
  border-radius: 10px;
  box-shadow: 0px 30px 38px 0 rgba(3, 92, 100, 0.26);
  background-color: rgb(3, 92, 100);
  position: fixed;
  animation: grow 0.25s;
  bottom: 50px;
  display: flex;
  justify-content: space-evenly;
}
@keyframes grow {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>