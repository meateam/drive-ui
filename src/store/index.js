import Vue from "vue";
import Vuex from "vuex";
import files from "./modules/files";
import configuration from "./modules/configuration";
import quota from "./modules/quota";
import auth from "./modules/auth";
import preferences from "./modules/preferences";
import loading from "./modules/loading";
import popupController from "./modules/popupController";
import error from "./modules/error";
import search from "./modules/search";
import success from "./modules/success";
import warning from "./modules/warning";
import directonary from "./modules/dictionary";
import uploadFolder from "./modules/uploadFolder";
import transfer from "./modules/transfer";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        files,
        configuration,
        auth,
        quota,
        loading,
        preferences,
        error,
        success,
        search,
        directonary,
        uploadFolder,
        transfer,
        warning,
        popupController,
    },
});
