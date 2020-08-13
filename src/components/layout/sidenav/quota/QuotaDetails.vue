<template>
  <div class="quota-usage-container">
      {{`${$t('sidenav.Quota.Usage', {used, limit})}`}}
  </div>
</template>

<script>
import filesize from 'filesize';
export default {
  name: "quota-details",
  props: ["quota"],
  computed: {
    used() {
      return filesize(this.quota.used);
    },
    limit() {
      return filesize(this.quota.limit);
    }
  }
};
</script>

<style scoped>
.quota-usage-container {
  direction: ltr;
  margin: 0 auto;
  color: #fff9e5;
  font-size: 0.75em;
  margin-top: 0.5em;
}
</style>
