<template>
  <div id="action-bar" v-if="chosenFiles.length">
    <Delete @click="deleteFiles" />
    <Move @click="moveFiles" />
    <Share @click="$refs.share.open()" />
    <SharePopup ref="share" :files="chosenFiles" />
  </div>
</template>

<script>
import Delete from "@/components/buttons/Delete";
import Move from "@/components/buttons/Move";
import Share from "@/components/buttons/Share";
import SharePopup from "@/components/popups/share/Share";

export default {
  name: "ActionBar",
  props: ["chosenFiles"],
  components: { Delete, Move, Share, SharePopup },
  methods: {
    deleteFiles() {
      this.$store.dispatch("deleteFiles", this.chosenFiles);
    },
    moveFiles() {}
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