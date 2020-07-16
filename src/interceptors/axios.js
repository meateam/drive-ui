import Axios from "axios";

import { isAlive } from "@/api/healthcheck";

import store from "@/store";
import router from "@/router";

Axios.interceptors.request.use(
  (request) => {
    store.commit("setLoading", true);
    request.headers["Authorization"] = `Bearer ${store.state.auth.token}`;
    if (!store.state.auth.token) return Promise.reject();
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    store.commit("setLoading", false);
    return response;
  },
  async (error) => {
    store.commit("setLoading", false);

    if (!error.response && !(await isAlive())) return router.push("/503");
    else if (error.status === 401) return store.dispatch("authenticate");

    return Promise.reject(error);
  }
);
