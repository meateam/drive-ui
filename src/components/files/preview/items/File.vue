<template>
  <v-lazy>
    <v-card
      id="file"
      :class="{selected: isSelected}"
      class="pointer"
      @dblclick="$emit('dblclick', $event, file)"
      @click.native.exact="$emit('click', $event, file)"
      @click.ctrl.native="$emit('ctrlclick', $event, file)"
      @contextmenu.prevent="$emit('contextmenu', $event, file)"
    >
      <img v-if="file.type.startsWith('image')" :src="getImage" id="image" />
      <iframe v-else-if="showPDF()" :src="getPDF" frameborder="0" scrolling="no" id="pdf"></iframe>
      <div v-else id="file-icon">
        <FileTypeIcon :file="file" :size="120" />
      </div>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <p v-on="on" id="file-name">{{file.name}}</p>
        </template>
        <span>{{file.name}}</span>
      </v-tooltip>
    </v-card>
  </v-lazy>
</template>

<script>
import { getPdfPreview, getPreview } from "@/api/files";
import { canPreviewPdf } from "@/utils/canPreview";
import FileTypeIcon from "@/components/files/BaseFileTypeIcon";

export default {
  name: "File",
  props: ["file", "isSelected"],
  components: { FileTypeIcon },
  methods: {
    showPDF() {
      return canPreviewPdf(this.file.type);
    }
  },
  computed: {
    getImage() {
      return getPreview(this.file.id);
    },
    getPDF() {
      return getPdfPreview(this.file.id);
    }
  }
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
  box-shadow: 0px 30px 38px 0 rgba(54, 116, 163, 0.21) !important;
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
  pointer-events: none;
  width: 100%;
  height: 100%;
}
</style>