/* eslint-disable no-unused-vars */
import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import NotFound from "@/views/errors/404";
import Unavailable from "@/views/errors/503";
import DeletedFiles from "@/views/DeletedFiles";
import QuestionAnswer from "@/views/Q&A";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/my-drive",
    },
    {
      path: "/files",
      redirect: "/my-drive",
    },
    {
      path: "*",
      redirect: "/404",
    },
    {
      path: "/my-drive",
      component: () => import("@/views/MyDrive"),
      meta: {
        layout: true,
      },
      name: "My Drive",
    },
    {
      path: "/shared-with-me",
      component: () => import("@/views/SharedWithMe"),
      meta: {
        layout: true,
      },
      name: "Shared With Me",
    },
    {
      path: "/folders",
      component: () => import("@/views/Folders"),
      meta: {
        layout: true,
      },
      name: "Folders",
    },
    {
      path: "/file",
      component: () => import("@/views/File"),
      meta: {
        layout: true,
      },
      name: "File",
    },
    {
      path: "/external-transferred-dropbox",
      component: () => import("@/views/ExternalTransferred"),
      meta: {
        layout: true,
      },
      props: {
        appID: "dropbox",
      },
      name: "External Transferred Dropbox",
    },
    {
      path: "/external-transferred-cargo",
      component: () => import("@/views/ExternalTransferred"),
      meta: {
        layout: true,
      },
      props: {
        appID: "cargo",
      },
      name: "External Transferred Cargo",
    },
    {
      path: "/statusTransferred",
      component: () => import("@/views/StatusTransferred"),
      meta: {
        layout: true,
      },
      name: "Status Transfers",
    },
    {
      path: "/last-updated",
      component: () => import("@/views/LastUpdated"),
      meta: {
        layout: true,
      },
      name: "Last Update",
    },
    {
      path: "/search",
      component: () => import("@/views/Search"),
      meta: {
        layout: true,
      },
      name: "Search",
    },
    {
      path: "/deleted-files",
      component: DeletedFiles,
      meta: {
        layout: true,
      },
      name: "Deleted Files",
    },
    {
      path: "/favorites",
      component: () => import("@/views/Favorites"),
      meta: {
        layout: true,
      },
      name: "Favorites",
    },
    {
      path: "/q&a",
      component: QuestionAnswer,
      meta: {
        layout: true,
      },
      name: "Q&A",
    },
    {
      path: "/404",
      component: NotFound,
      name: "Not Found",
    },
    {
      path: "/503",
      component: Unavailable,
      name: "Unavailable",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch("onRouteChange", from);
  await store.dispatch("onFolderChange", to.query.id);

  next();
});

export default router;
