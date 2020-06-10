<template>
  <div id="action-bar" v-if="show">
    <Download @click="downloadFiles" />
    <Delete @click="deleteFiles" />
    <Move @click="moveFiles" />
    <Share @click="shareFiles" />
  </div>
</template>

<script>
import Download from "@/components/shared/buttons/Download";
import Delete from "@/components/shared/buttons/Delete";
import Move from "@/components/shared/buttons/Move";
import Share from "@/components/shared/buttons/Share";

export default {
  name: "ActionBar",
  props: ["show"],
  components: { Download, Delete, Move, Share },
  methods: {
    downloadFiles() {},
    deleteFiles() {},
    moveFiles() {},
    shareFiles() {}
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
  animation: grow .25s;
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