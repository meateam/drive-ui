<template>
  <div id="itemResult" class="mb-4 mt-4">
    <v-row>
      <v-col sm="1"><FileTypeIcon :file="returnItem(item)" :size="25"/></v-col>
      <v-col lg="8" id="nameAndContent" class="mt-2">
        <v-row align="start">
          <div v-html="returnFileName(item)"></div>
        </v-row>
        <v-row>
          <div id="highlightedContent" v-if="item.highlightedContent" v-html="item.highlightedContent"></div>
        </v-row>
      </v-col>

      <v-col lg="3">
        <v-row class="justify-end">
          <div id="itemLinkDest">{{ $t("header.AdvancedSearchFileLocation") }}</div>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FileTypeIcon from "@/components/files/BaseFileTypeIcon";

export default {
  name: "ItemResult",
  props: ["item"],
  components: { FileTypeIcon },
  methods: {
    returnItem: (item) => {
      return item?.name ? item : item.file;
    },
    returnFileName: (item) => {
      return item?.name ? item.name : item.highlightedFileName ? item.highlightedFileName : item.file.name;
    },
  },
};
</script>

<style scoped>
#itemResult {
  height: 50px;
  width: 460px;
}
#nameAndContent {
  width: 300px;
}
#highlightedContent {
  font-size: small;
}
#itemLinkDest {
  height: 20px;
  width: 100px;
  z-index: 1000;
  font-size: smaller;
  color: #1976d2 !important;
  text-decoration: underline;
}
</style>
