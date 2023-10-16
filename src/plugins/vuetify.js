import Vue from "vue";
import Vuetify from "vuetify/lib";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);
Vue.use(require('vue-shortkey'), { prevent: ['input'] })

export default new Vuetify({
  icons: {
    iconfont: "md",
  },
  rtl: true,
});
