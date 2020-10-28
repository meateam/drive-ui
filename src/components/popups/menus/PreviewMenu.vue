<template>
  <div id="action-bar">
    <InfoButton :icon="true" />
    <DownloadButton :icon="true" />
    <DeleteButton :icon="true" @close="$emit('close')" />
    <MoveToButton :icon="true" @close="$emit('close')" />
    <OnlineEditButton :icon="true" />
    <EditButton :icon="true" @close="$emit('close')" />
    <ShareButton :icon="true" @close="$emit('close')" />
    <ExternalTransferButton :icon="true" @close="$emit('close')" />
  </div>
</template>

<script>
import DownloadButton from "@/components/buttons/DownloadButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import MoveToButton from "@/components/buttons/MoveToButton";
import EditButton from "@/components/buttons/EditButton";
import OnlineEditButton from "@/components/buttons/OnlineEditButton";
import InfoButton from "@/components/buttons/InfoButton";
import ShareButton from "@/components/buttons/ShareButton";
import ExternalTransferButton from "@/components/buttons/ExternalTransferButton";

export default {
  name: "PreviewMenu",
  components: {
    DownloadButton,
    OnlineEditButton,
    ShareButton,
    MoveToButton,
    DeleteButton,
    InfoButton,
    EditButton,
    ExternalTransferButton,
  },
};
</script>

<style scoped>
#action-bar {
  width: fit-content;
  position: absolute;
  top: 20px;
  left: 30px;
  z-index: inherit;
  display: flex;
  justify-content: space-evenly;
}
</style>