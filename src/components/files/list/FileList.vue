<template>
  <div>
    <ListHeader />
    <File v-bind:key="file.id" v-for="file in files" v-bind:file="file" />
    <ActionBar />
  </div>
</template>

<script>
import File from "./File";
import ListHeader from "./ListHeader";
import ActionBar from "./ActionBar";

export default {
  name: "FileList",
  props: ["files"],
  components: { File, ListHeader, ActionBar },
};
</script>