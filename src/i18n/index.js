import Vue from "vue";
import VueI18n from "vue-i18n";

import he from "./he.json";
import en from "./en.json";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "he",
  fallbackLocale: "he",
  messages: {
    he,
    en,
  },
});

export default i18n;
