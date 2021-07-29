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
    <img @click="starClick" v-if="!folder.isFavorite && hover" class="star" src="@/assets/icons/dark-gray-star.svg" />
    <img @click="starClick" v-if="folder.isFavorite" class="star" src="@/assets/icons/orange-star.svg" />
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
    starClick() {
      if (!this.folder.isFavorite) favApi.addFavorite({fileID: this.folder.id})
      else favApi.deleteFavorite({fileID: this.folder.id})
      this.folder.isFavorite = !this.folder.isFavorite
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

.star {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 10px;
  left: 10px;
}


</style>