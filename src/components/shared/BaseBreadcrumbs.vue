<template>
  <div class="flex">
    <div>
      <span @click="$emit('click', undefined)" class="pointer">{{$t('myDrive.header')}}</span>
      <span class="space">></span>
    </div>
    <div v-for="folder in folders" :key="folder.id">
      <span @click="$emit('click', folder.id)" class="pointer">{{folder.name}}</span>
      <span class="space">></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: ["folders"]
};
</script>

<style scoped>
.space {
  margin: 0 8px;
}
</style>