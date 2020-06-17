/* eslint-disable no-unused-vars */
import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import NotFound from "@/views/errors/404";
import MyDrive from "@/views/MyDrive";
import SharedWithMe from "@/views/SharedWithMe";
import Folders from "@/views/Folders";
import LastUpdate from "@/views/LastUpdate";
import DeletedFiles from "@/views/DeletedFiles";
import Favorites from "@/views/Favorites";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/my-drive",
    },
    {
      path: "*",
      redirect: "/404",
    },
    {
      path: "/my-drive",
      component: MyDrive,
      name: "My Drive",
    },
    {
      path: "/shared-with-me",
      component: SharedWithMe,
      name: "Shared With Me",
    },
    {
      path: "/folders",
      component: Folders,
      name: "Folders",
    },
    {
      path: "/last-update",
      component: LastUpdate,
      name: "Last Update",
    },
    {
      path: "/deleted-files",
      component: DeletedFiles,
      name: "Deleted Files",
    },
    {
      path: "/favorites",
      component: Favorites,
      name: "Favorites",
    },
    {
      path: "/404",
      component: NotFound,
      name: "Not Found",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = to.name;
  if (store.state.configuration.authUrl) await store.dispatch("authenticate");
  await store.dispatch("onFolderChange", to.query.id);
  if (to.name === "Shared With Me") {
    await store.dispatch("fetchSharedFiles");
  } else if (to.name === "Last Update") {
    await store.dispatch("fetchLastUpdateddFiles");
  } else {
    await store.dispatch("fetchFiles");
  }
  next();
});

export default router;
