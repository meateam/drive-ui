<template>
  <div class="flex">
    <div v-if="folders">
      <span @click="$emit('click', undefined)" class="pointer">{{$t('pageHeaders.MyDrive')}}</span>
      <span class="space">></span>
    </div>
    <div v-for="folder in folders" :key="folder.id">
      <span @click="$emit('click', folder)" class="pointer">{{folder.name}}</span>
      <span class="space">></span>
    </div>
    <span>{{currentFolder? currentFolder.name : $t('pageHeaders.MyDrive')}}</span>
  </div>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: ["folders", "currentFolder"]
};
</script>

<style scoped>
.space {
  margin: 0 8px;
}
</style>