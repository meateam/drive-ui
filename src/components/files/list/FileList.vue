<template>
  <div>
    <File v-bind:key="file.id" v-for="file in files" v-bind:file="file" />
  </div>
</template>

<script>
import File from "./File";

export default {
  name: "FileList",
  props: ["files"],
  components: { File }
};
</script>

<style scoped>
</style>