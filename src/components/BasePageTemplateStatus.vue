<template>
  <div class="page-container">
    <div id="page-header">
      <h1 v-if="!breadcrumbs" id="page-name">{{ header }}</h1>
      <div v-else>
        <Breadcrumbs page="true" :items="breadcrumbs" @click="$emit('breadcrumb', $event)" />
      </div>
    </div>

    <StatusView
      v-if="items"
      :items="items"
      :itemsLength="itemsLength"
      :sortable="sortable"
      @page="$emit('page', $event)"
    />
  </div>
</template>

<script>
import StatusView from "@/components/status/StatusView";
import Breadcrumbs from "@/components/shared/BaseBreadcrumbs";

export default {
  name: "PageTemplateStatus",
  components: { StatusView, Breadcrumbs },
  props: ["items", "header", "breadcrumbs", "itemsLength", "sortable"],
};
</script>

<style scoped>
#page-header {
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #035c64;
}
#page-name {
  font-size: 40px;
  color: #2c3448;
  font-family: Assistant-ExtraBold;
  font-weight: 400;
  text-align: right;
}
</style>
