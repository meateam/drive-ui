<template>
  <div class="auto-margin">
    <v-tour name="tour" :steps="steps" :options="options"></v-tour>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn @click="startTour()" v-on="on" icon>
          <v-icon color="#2C3448">menu_book</v-icon>
        </v-btn>
      </template>
      <span>{{ $t("tour.Tooltip") }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "Tour",
  methods: {
    startTour() {
      this.$tours["tour"].start();
    }
  },
  data() {
    return {
      options: {
        useKeyboardNavigation: true,
        labels: {
          buttonSkip: this.$t("buttons.Skip"),
          buttonPrevious: this.$t("buttons.Back"),
          buttonNext: this.$t("buttons.Continue"),
          buttonStop: this.$t("buttons.Finish")
        }
      },
      steps: [
        {
          target: ".drive-icon",
          content: this.$t("tour.GetStarted")
        },
        {
          target: "#my-drive-link",
          content: this.$t("tour.MyDrive1")
        },
        {
          target: "#my-drive-link",
          content: this.$t("tour.MyDrive2")
        },
        {
          target: "#fab",
          content: this.$t("tour.Fab")
        },
        {
          target: "#fab",
          content: this.$t("tour.UploadFile"),
          params: {
            placement: "left"
          }
        },
        {
          target: "#fab",
          content: this.$t("tour.UploadFolder"),
          params: {
            placement: "left"
          }
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>