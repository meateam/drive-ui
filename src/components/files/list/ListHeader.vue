<template>
  <div class="file-list-structure">
    <v-checkbox @change="$emit('check', isChecked)" v-model="isChecked" color="#357e6f"></v-checkbox>
    <div></div>
    <p id="file-name">{{$t('file.Name')}}</p>
    <p>{{$t('file.Owner')}}</p>
    <p>{{$t('file.LastUpdate')}}</p>
    <p id="file-size">{{$t('file.Size')}}</p>
  </div>
</template>

<script>
export default {
  name: "ListHeader",
  data() {
    return {
      isChecked: false
    };
  },
  methods: {
    check(val) {
      this.isChecked = val;
    }
  }
};
</script>