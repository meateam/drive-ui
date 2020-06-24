<template>
  <div id="action-bar" v-if="chosenFiles.length">
    <Download :icon="true" />
    <Share :icon="true" />
    <Delete :icon="true" />
    <Move :icon="true" />
    <Info :icon="true" />
    <Edit :icon="true" />
  </div>
</template>

<script>
import Download from "@/components/buttons/Download";
import Delete from "@/components/buttons/Delete";
import Move from "@/components/buttons/Move";
import Edit from "@/components/buttons/Edit";
import Info from "@/components/buttons/Info";
import Share from "@/components/buttons/Share";

export default {
  name: "BottomMenu",
  props: ["chosenFiles"],
  components: { Download, Share, Move, Delete, Info, Edit }
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