<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/file.png" />
        <p class="d-title">{{$t('fileInfo.Info')}}</p>
      </div>
      <div class="popup-body">
        <div class="file-info">
          <KeyValue :field="$t('fileInfo.Owner')" :value="file.owner" />
          <KeyValue :field="$t('fileInfo.Size')" :value="file.size" />
          <KeyValue :field="$t('fileInfo.Name')" :value="file.name" />
          <KeyValue :field="$t('fileInfo.CreatedAt')" :value="file.createdAt" />
          <KeyValue :field="$t('fileInfo.Type')" :value="file.type" />
          <KeyValue :field="$t('fileInfo.UpdatedAt')" :value="file.updatedAt" />
        </div>
        <v-divider></v-divider>
        <div class="flex popup-side">
          <div></div>
          <div></div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import KeyValue from "../KeyValue";

export default {
  name: "FileInfo",
  props: ["file"],
  components: { KeyValue },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    open() {
      this.dialog = true;
    }
  }
};
</script>

<style scoped>
.file-info {
  display: grid;
  grid-template-columns: auto auto;
  margin-bottom: 12px;
}
</style>