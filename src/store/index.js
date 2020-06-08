import Vue from "vue";
import Vuex from "vuex";
import files from "./modules/files";
import configuration from "./modules/configuration";
import quota from "./modules/quota";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { files, configuration, quota },
});
