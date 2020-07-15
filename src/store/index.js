import Vue from "vue";
import Vuex from "vuex";
import files from "./modules/files";
import configuration from "./modules/configuration";
import quota from "./modules/quota";
import auth from "./modules/auth";
import preferences from "./modules/preferences";
import loading from "./modules/loading";
import error from "./modules/error";
import search from "./modules/search";
import success from "./modules/success";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { files, configuration, auth, quota, loading, preferences, error, success, search },
});
