import Vue from "vue";
import Vuex from "vuex";
import files from "./modules/files";
import configuration from "./modules/configuration";
import quota from "./modules/quota";
import auth from "./modules/auth";
import users from "./modules/users";
import share from "./modules/share";
import search from "./modules/search";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { files, configuration, auth, quota, users, share, search },
});
