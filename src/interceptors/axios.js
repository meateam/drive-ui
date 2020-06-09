import axios from "axios";
import store from "@/store";

axios.interceptors.request.use(
  (request) => {
    request.headers["Authorization"] = `Bearer ${store.state.auth.token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
