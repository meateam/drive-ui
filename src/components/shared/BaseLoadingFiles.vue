<template>
  <v-menu bottom offset-y max-height="400" id="load-menu" min-width="300" v-model="files.length">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" text id="show-menu-button">
        <v-progress-circular id="loading" :size="40" :width="3" color="#035c64" indeterminate></v-progress-circular>
        <p>{{$t('file.Loading')}}</p>
        <p id="loading-p">{{`(${files.length})`}}</p>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(file,index) in files" :key="index">
        <div id="file-container">
          <div class="space-between">
            <!-- <v-btn icon @click="onCancel(file)">
              <v-icon>cancel</v-icon>
            </v-btn> -->
            <v-list-item-title id="file-name">{{file.name}}</v-list-item-title>
          </div>
          <v-progress-linear :value="file.progress" color="#035c64"></v-progress-linear>
        </div>
        <v-icon id="file-icon" color="#9caec4">insert_drive_file</v-icon>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "LoadingFiles",
  props: ["files"],
  methods: {
    onCancel(file) {
      this.$store.dispatch("cancelUpload", file);
    }
  }
};
</script>

<style scoped>
#loading {
  margin: auto 15px;
}
#loading-p {
  align-self: center;
  font-size: 18px;
  margin-left: 15px;
}
#show-menu-button {
  height: 100%;
}
#file-name {
  font-size: 14.5px;
  padding-bottom: 10px;
  text-align: left;
  color: #035c64;
}
#file-icon {
  font-size: 35px;
  margin-right: 10px;
}
#file-container {
  width: 100%;
}
.v-menu__content {
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 0 0 70px 0 rgba(54, 116, 163, 0.3);
  background-color: #ffffff;
}
</style>