<template>
  <v-card
    @mouseover="mouseOver()"
    @mouseleave="mouseLeave()"
    id="folder"
    class="pointer"
    :class="{ selected: isSelected }"
    @dblclick="$emit('dblclick', $event, folder)"
    @contextmenu.prevent="$emit('contextmenu', $event, folder)"
    @click.native.exact="$emit('click', folder)"
    @click.ctrl.native="$emit('ctrlclick', folder)"
  >
    <img @click="starclick" v-if="!folder.isFavorite && hover" class="starfull" src="@/assets/icons/favorite.jpg" />
    <v-icon @click="starclick" v-if="folder.isFavorite" class="starfull" left >star</v-icon>
    <v-icon color="#fc8946" id="folder-icon">folder</v-icon>
    <p id="folder-name">{{ folder.name }}</p>
  </v-card>
</template>

<script>
import * as favApi from "@/api/favorite";

export default {
  name: "Folder",
  props: ["folder", "isSelected"],
  data() {
  return {
    hover: false,  
  }
},
  methods: {
    starclick() {
      if (!this.folder.isFavorite) {
          this.folder.isFavorite = true;
          favApi.addFavorite({fileID: this.folder.id})
        } else {
          this.folder.isFavorite = false
          favApi.deleteFavorite({fileID: this.folder.id})
        }
    },
    mouseOver() {
      this.hover = true;
    },
    mouseLeave() {
      this.hover = false;
    }
  },
};
</script>

<style scoped>
#folder {
  width: 220px;
  height: 50px;
  display: flex;
  line-height: 50px;
  box-shadow: 0px 1px 6px 0 rgba(42, 87, 120, 0.1);
  border-radius: 10px;
  margin: 0 0 15px 15px;
}
.selected {
  box-shadow: 0px 30px 38px 0 rgba(44, 110, 161, 0.308) !important;
}
#folder-name {
  letter-spacing: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
}
#folder-icon {
  margin: auto 10px;
}

.starfull {
  color: gray;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>