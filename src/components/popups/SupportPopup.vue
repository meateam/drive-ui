<template>
  <v-dialog v-model="dialog" max-width="500" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/green-chat.svg" />
        <p class="d-title">{{$t('support.Header')}}</p>
      </div>
      <div class="popup-body">
        <!-- <div class="support">
          <GreenTextButton :label="$t('questions.Header')" @click="openQuestions" />
        </div>
        <v-divider />-->
        <div class="support">
          <p>{{$t('support.DriveSupport')}}</p>
          <GreenTextButton :label="$t('buttons.ClickHere')" @click="openDriveSupport" />
        </div>
        <v-divider />
        <div class="support">
          <p>{{$t('support.DropboxSupport')}}</p>
          <GreenTextButton :label="$t('buttons.ClickHere')" @click="openDropboxSupport" />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import GreenTextButton from "@/components/buttons/BaseGreenTextButton";

export default {
  name: "SupportPopup",
  data() {
    return {
      dialog: false,
    };
  },
  components: { GreenTextButton },
  computed: {
    ...mapGetters(["supportLink", "dropboxSupportLink"]),
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
      window.open(this.dropboxSupportLink);
    },
    openQuestions() {
      this.dialog = false;
      this.$router.push("/q&a");
    },
  },
};
</script>

<style scoped>
.support {
  text-align: center;
  font-size: 20px;
  padding: 10px 0;
}
</style>