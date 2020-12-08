<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card color="#f0f4f7">
      <div class="popup-header">
        <img
          class="popup-icon auto-margin"
          src="@/assets/icons/green-alert.svg"
        />
        <p class="d-title">
          {{ $t("externalTransfer.CantChooseApprove", { name }) }}
        </p>
        <v-btn id="close-button" icon @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </div>

      <h3 id="reasons-header">{{ $t("externalTransfer.Reasons") }}</h3>

      <v-list-item
        v-for="(reason, index) in reasons"
        :key="index"
        class="align-center"
      >
        <v-list-item-content>
          <v-list-item-title>{{ reason.text }}</v-list-item-title>
          <v-list-item-subtitle>{{ reason.support }} </v-list-item-subtitle>
          <v-list-item-subtitle v-if="reason.link" class="align-center">
            <v-btn text small @click="onLinkClick(reason.link)">
              {{ $t("externalTransfer.cantApproveSupport.OpenInTomy") }}
            </v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions id="back-to-share">
        <SubmitButton
          @click="dialog = false"
          :label="$t('buttons.BackToShare')"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import SubmitButton from "@/components/buttons/BaseSubmitButton";

export default {
  name: "DropboxSupportPopup",
  components: { SubmitButton },
  data() {
    return {
      dialog: false,
      reasons: "",
      name: "",
    };
  },
  computed: {
    ...mapGetters(["bamSupportNumber", "bereshitSupportLink"]),
  },
  methods: {
    open(blockedApprover) {
      this.name = blockedApprover.name;
      this.reasons = this.extractReasons(blockedApprover.reasons);
      this.dialog = true;
    },
    onLinkClick(link) {
      window.open(link);
    },
    extractReasons(cantApproveReasons) {
      return cantApproveReasons.map((reason) => {
        let support = "";
        let link = "";

        const text = this.$t(`externalTransfer.cantApproveReasons.${reason}`);

        switch (reason) {
          case "ApproverIsBlocked":
            support = `${this.$t(
              "externalTransfer.cantApproveSupport.Bam"
            )} - ${this.bamSupportNumber}`;
            break;
          case "ApproverCantApproveInHisUnit":
            support = `${this.$t(
              "externalTransfer.cantApproveSupport.Bam"
            )} - ${this.bamSupportNumber}`;
            break;
          case "UserHasNoUnit" || "ApproverHasNoUnit":
            support = this.$t("externalTransfer.cantApproveSupport.Bereshit");
            link = this.bereshitSupportLink || "#";
            break;
          case "ApproverHasNoUnit":
            support = this.$t("externalTransfer.cantApproveSupport.Bereshit");
            link = this.bereshitSupportLink || "#";
            break;
        }

        return { text, support, link };
      });
    },
  },
};
</script>

<style scoped>
.popup-icon {
  width: 200px;
}
#close-button {
  position: absolute;
  top: 10px;
  left: 10px;
}
#back-to-share {
  position: absolute;
  width: 100%;
  bottom: 100px;
  display: flex;
  justify-content: center;
}
#reasons-header {
  text-align: center;
  margin-top: 20px;
  text-decoration: underline;
}
</style>