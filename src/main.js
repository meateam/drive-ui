import Vue from "vue";
import VueTour from "vue-tour";
import App from "./App.vue";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";
import vuetify from "@/plugins/vuetify";
// import { initApm } from '@/utils/apm';
import "@/interceptors/axios";
import "vue-tour/dist/vue-tour.css";

Vue.config.productionTip = false;
Vue.config.errorHandler = function (err) {
  
  console.log("fadfsfds", err)
}
Vue.use(VueTour);

(async () => {
  await store.dispatch("fetchConfig");
  await store.dispatch("authenticate");
  // await initApm();

  new Vue({
    vuetify,
    i18n,
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
})();
