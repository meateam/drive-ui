<template>
  <v-lazy>
    <v-card
      @mouseover="mouseOver()"
      @mouseleave="mouseLeave()"
      id="file"
      :class="{ selected: isSelected }"
      class="pointer"
      @dblclick="$emit('dblclick', $event, file)"
      @contextmenu.prevent="$emit('contextmenu', $event, file)"
      @click.native.exact="$emit('click', file)"
      @click.ctrl.native="$emit('ctrlclick', file)"
    >
      <img v-if="file.type.startsWith('image')" :src="getImage" id="image" />
      <iframe
        v-else-if="showPDF()"
        :src="getPDF"
        frameborder="0"
        scrolling="no"
        id="pdf"
      ></iframe>
      <div v-else id="file-icon">
        <FileTypeIcon :file="file" :size="120" :view="false" />
      </div>

      <img @click="starclick" v-if="!file.isFavorite && hover" class="starfull"  src="@/assets/icons/favorite.jpg" />
      <v-icon @click="starclick" v-if="file.isFavorite" class="starfull" left >star</v-icon>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <p v-on="on" id="file-name">{{ file.name }}</p>
        </template>
        <span>{{ file.name }}</span>
      </v-tooltip>
    </v-card>
  </v-lazy>
</template>

<script>
import { getPdfPreview, getPreview } from "@/api/files";
import { canPreviewPdf } from "@/utils/canPreview";
import FileTypeIcon from "@/components/files/BaseFileTypeIcon";
import * as favApi from "@/api/favorite";

export default {
  name: "File",
  props: ["file", "isSelected"],
  components: { FileTypeIcon },
  data() {
    return {
      hover: false,  
    }
  },
  methods: {
    showPDF() {
      return canPreviewPdf(this.file.type);
    },
    starclick() {
        if (!this.file.isFavorite) {
          this.file.isFavorite = true;
          favApi.addFavorite({fileID: this.file.id})
        } else {
          this.file.isFavorite = false
          favApi.deleteFavorite({fileID: this.file.id})
        }
    },
    mouseOver() {
      this.hover = true;
    },
    mouseLeave() {
      this.hover = false;
    }
  },
  computed: {
    getImage() {
      return getPreview(this.file.id);
    },
    getPDF() {
      return getPdfPreview(this.file.id);
    },
  },
};
</script>
<style scoped>
#file {
  width: 220px;
  position: relative;
  height: 185px;
  line-height: 50px;
  margin: 0 0 15px 15px;
  box-shadow: 0px 1px 6px 0 rgba(42, 87, 120, 0.1);
  border-radius: 10px !important;
}

.selected {
  box-shadow: 0px 30px 38px 0 rgba(44, 110, 161, 0.308) !important;
}
#file-name {
  letter-spacing: 1px;
  position: absolute;
  bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  direction: ltr;
  right: 0;
  padding: 0 15px;
  background-color: #ffffff;
  height: 51px;
  border-top: solid 1px #dfe5eb;
  width: 100%;
  text-align: center;
  font-size: 18px;
}


#image {
  max-width: 50%;
  max-height: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 20px auto;
}
#file-icon {
  max-width: 50%;
  max-height: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 20px auto;
  font-size: 80px;
}
#pdf {
  width: 100%;
  height: 100%;
  pointer-events: none !important;
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