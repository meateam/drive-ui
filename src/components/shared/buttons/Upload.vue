<template>
  <input type="file" id="upload-input" @change="uploadInput($event)" multiple />
</template>

<script>
export default {
  name: "Upload",
  methods: {
    uploadInput(event) {
      event.currentTarget.value = ""; // resets file choice
    }
  }
};
</script>

<style>
input {
  display: none;
}
</style>