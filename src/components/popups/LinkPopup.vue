<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <v-icon color="#007A99" class="popup-icon">share</v-icon>
        <p class="d-title">{{$t('share.Link')}}</p>
      </div>
      <div class="popup-body">
        <v-text-field
          readonly
          :label="location"
          solo
          append-icon="content_copy"
          @click:append="copy"
        ></v-text-field>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LinkPopup",
  data() {
    return {
      dialog: false,
      location:
        this.$route.path === "/my-drive"
          ? `${window.location.origin}/shared-with-me`
          : window.location.href,
    };
  },
  methods: {
    open() {
      console.log(this.$route.path === "/my-drive");
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    copy() {
      this.$store.commit("onSuccess", "success.Copied");
      navigator.clipboard.writeText(this.location);
    },
  },
};
</script>

<style scoped>
.popup-icon {
  font-size: 70px;
  width: 100%;
  display: block;
  text-align: center;
}
</style>