import Vue from "vue";
import VueTour from "vue-tour";

import { isAlive } from "@/api/healthcheck";

import App from "@/App.vue";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";
import vuetify from "@/plugins/vuetify";

import "@/interceptors/axios";
import "vue-tour/dist/vue-tour.css";

Vue.config.productionTip = false;
Vue.use(VueTour);

(async () => {
  if (await isAlive()) {
    await store.dispatch("fetchConfig");
    await store.dispatch("authenticate");
  } else {
    router.push({ name: "Unavailable" });
  }

  new Vue({
    vuetify,
    i18n,
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
})();
