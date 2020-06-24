<template>
  <v-dialog v-model="dialog" max-width="500" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/note.png" />
        <p class="d-title">{{$t('support.Header')}}</p>
      </div>
      <div class="popup-body">
        <div class="support">
          <p>{{$t('support.DriveSupport')}}</p>
          <ClickHere @click="openDriveSupport" />
        </div>
        <v-divider />
        <div class="support">
          <p class="support">{{$t('support.DropboxSupport')}}</p>
          <ClickHere @click="openDropboxSupport" />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import ClickHere from "@/components/buttons/ClickHere";

export default {
  name: "SupportPopup",
  data() {
    return {
      dialog: false
    };
  },
  components: { ClickHere },
  computed: {
    ...mapGetters(["supportLink"])
  },
  methods: {
    open() {
      this.dialog = true;
    },
    openDriveSupport() {
      this.dialog = false;
      window.open(this.supportLink);
    },
    openDropboxSupport() {
      this.dialog = false;
      window.open(this.supportLink);
    }
  }
};
</script>

<style scoped>
.support {
  font-size: 20px;
  padding: 10px 0;
}
</style>