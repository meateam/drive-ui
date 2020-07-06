import axios from "axios";
import store from "@/store";
import { apm } from '@/utils/apm';

let transaction;
axios.interceptors.request.use(
  (request) => {
    transaction = apm.startTransaction(`${request.url} ${request.method}`, 'http');
    store.commit("setLoading", true);
    request.headers["Authorization"] = `Bearer ${store.state.auth.token}`;
    if (!store.state.auth.token) return Promise.reject();
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    store.commit("setLoading", false);
    transaction.end();
    return response;
  },
  (error) => {
    store.commit("setLoading", false);
    return Promise.reject(error);
  }
);
