import Vue from "vue";
import Vuex from "vuex";
import files from "./modules/files";
import configuration from "./modules/configuration";
import quota from "./modules/quota";
import auth from "./modules/auth";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { files, configuration, auth, quota, user },
});
