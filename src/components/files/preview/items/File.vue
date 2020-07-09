<template>
  <v-card
    id="file"
    :class="{selected: isSelected}"
    class="pointer"
    @dblclick="$emit('dblclick', $event, file)"
    @click.native.exact="$emit('click', $event, file)"
    @click.ctrl.native="$emit('ctrlClick', $event, file)"
    @contextmenu.prevent="$emit('contextmenu', $event, file)"
  >
    <div class="file-preview-container" v-if="file.type.startsWith('image')">
      <img :src="getImage" id="image" />
    </div>
    <div v-else-if="showPDF()" class="file-preview-container">
      <iframe :src="getPDF" frameborder="0" scrolling="no" id="pdf"></iframe>
    </div>
    <v-icon v-else-if="file.type.startsWith('audio')" color="#9caec4" class="file-icon">audiotrack</v-icon>
    <v-icon v-else-if="file.type.startsWith('video')" color="#9caec4" class="file-icon">movie</v-icon>
    <v-icon v-else color="#9caec4" class="file-icon">insert_drive_file</v-icon>
    <p id="file-name">{{file.name}}</p>
  </v-card>
</template>

<script>
import { getPdfPreview, getPreview } from "@/api/files";
import { canPreviewPdf } from "@/utils/canPreview";

export default {
  name: "File",
  props: ["file", "isSelected"],
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
  max-width: 65%;
  max-height: 65%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.file-icon {
  text-align: center;
  display: block;
  margin-top: 28px;
  font-size: 80px;
}
#pdf {
  pointer-events: none;
  width: 100%;
  height: 100%;
}
.file-preview-container {
  height: calc(90% - 45px);
  width: 80%;
  border-radius: 10px;
  position: absolute;
  bottom: 45px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 24px 0 rgba(76, 91, 140, 0.2);
}
</style>