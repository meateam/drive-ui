<template>
  <div id="noData">
    <img class="data-image auto-margin" :src="require(`@/assets/images/empty_files.svg`)" />
    <p>{{ $t("NoData") }}</p>
  </div>
</template>

<script>
export default {
  name: "FilesEmpty",
};
</script>

<style scoped>
#noData {
  margin-top: 30px;
  text-align: center;
}
.data-image {
  width: 170px;
  padding-top: 30px;
}
</style>
