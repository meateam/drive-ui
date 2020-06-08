import Vue from "vue";
import VueI18n from "vue-i18n";

import he from "./he.json";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "he",
  fallbackLocale: "he",
  messages: {
    he,
  },
});

export default i18n;
