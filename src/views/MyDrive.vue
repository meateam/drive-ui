<template>
  <div>
    <PageTemplate :files="files" :sortable="true" :header="$t('pageHeaders.MyDrive')" :upload="true" />
    <transition name="fade">
      <div v-if="showPopup" class="popup">
        <div style="text-align: center;" dir="rtl" class="popupContent">
          <h2 style="margin-top: 15px; color: white;">
            התחדשנו!
          </h2>
          <div style="display: flex; justify-content: center; color: white;">
            <h3 style="width: 85%;">
              שמחים להזמין אתכם לדרייב החדש! אנחנו עוברים למערכת חדשה המציעה ביצועים מהירים יותר ושלל פיצ'רים חדשים. בלילה
              שבין שני לשלישי, בין השעות 00:00 ל02:00, יבוצע מעבר של הקבצים שלכם למערכת החדשה. מוזמנים לעבור למערכת החדשה
              כבר עכשיו!
            </h3>
          </div>

          <div style="padding: 10px 30px;">
            <img class="driveImage" style="border-radius: 10px; border: 2px solid lightgray"
              src="@/assets/images/driveSample.png" width="90%">
          </div>
        </div>
        <div style="display: flex; width: 100%; flex-direction: row; justify-content: center; margin: 20px; gap: 15px;">
          <v-btn style="width: 200px; font-size: 16px;" @click="closePopup" class="close-btn">סגירה</v-btn>
          <v-btn style="width: 200px; font-size: 16px; color: white; background-color: #298d82;" @click="goToNewDrive"
            class="new-drive-btn">מעבר לדרייב החדש</v-btn>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PageTemplate from "@/components/BasePageTemplate";
import store from "@/store";

export default {
  name: "MyDrive",
  components: { PageTemplate },
  data() {
    return {
      showPopup: true
    };
  },
  computed: {
    ...mapGetters(["files"]),
  },
  methods: {
    closePopup() {
      this.showPopup = false;
      store.commit("hideNewDrivePopup")
    },
    goToNewDrive() {
      window.location.href = "https://drive.team-pandora.com/"
    }
  },
  created() {
    this.$store.dispatch("fetchFiles");
  },
};
</script>

<style scoped>
.popup {
  display: flex;
  flex-flow: column;
  width: 1200px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.popupContent {
  flex-grow: 1;
  background-image: linear-gradient(to bottom, #347a99, #2f7e71);
  background-size: cover;


}

/* Existing styles */

/* Fade transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}</style>