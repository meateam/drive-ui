<template>
  <div class="file-list-structure">
    <div></div>
    <p id="file-name">{{$t('file.Name')}}</p>
    <p>{{$t('file.Owner')}}</p>
    <p>{{$t('file.LastUpdate')}}</p>
    <p id="file-size">{{$t('file.Size')}}</p>
  </div>
</template>

<script>
export default {
  name: "ListHeader"
};
</script>