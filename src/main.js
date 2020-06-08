import Vue from "vue";
import App from "./App.vue";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
