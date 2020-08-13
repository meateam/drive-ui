<template>
  <div id="action-bar" v-if="chosenFiles.length">
    <DownloadButton :icon="true" />
    <ShareButton :icon="true" />
    <DeleteButton :icon="true" />
    <MoveButton :icon="true" />
    <InfoButton :icon="true" />
    <OnlineEditButton :icon="true" />
    <EditButton :icon="true" />
    <PreviewButton :icon="true" />
  </div>
</template>

<script>
import DownloadButton from "@/components/buttons/DownloadButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import MoveButton from "@/components/buttons/MoveButton";
import EditButton from "@/components/buttons/EditButton";
import OnlineEditButton from "@/components/buttons/OnlineEditButton";
import InfoButton from "@/components/buttons/InfoButton";
import PreviewButton from "@/components/buttons/PreviewButton";
import ShareButton from "@/components/buttons/ShareButton";

export default {
  name: "BottomMenu",
  props: ["chosenFiles"],
  components: {
    DownloadButton,
    OnlineEditButton,
    ShareButton,
    MoveButton,
    DeleteButton,
    InfoButton,
    EditButton,
    PreviewButton
  }
};
</script>

<style scoped>
#action-bar {
  width: fit-content;
  padding: 8px 20px 8px 20px;
  border-radius: 10px;
  box-shadow: 0px 30px 38px 0 rgba(53, 126, 111, 0.42);
  background-color: #357e6f;
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