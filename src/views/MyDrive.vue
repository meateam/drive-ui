<template>
  <div>
    <h1 class="page-header">{{$t('myDrive.header')}}</h1>
    <Fab />
  </div>
</template>

<script>
import Fab from "../components/shared/Fab";
export default {
  name: "MyDrive",
  components: { Fab }
};
</script>

<style>
</style>