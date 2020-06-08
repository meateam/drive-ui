<template>
  <div>
    <h1 class="page-header">{{$t('shared.header')}}</h1>
    <Fab />
  </div>
</template>

<script>
import Fab from "../components/shared/Fab";
export default {
  name: "Shared",
  components: { Fab }
};
</script>

<style>
</style>