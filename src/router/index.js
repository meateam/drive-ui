/* eslint-disable no-unused-vars */
import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import NotFound from "@/views/errors/404";
import Unavailable from "@/views/errors/503";
import DeletedFiles from "@/views/DeletedFiles";
import Favorites from "@/views/Favorites";
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
      path: "*",
      redirect: "/404",
    },
    {
      path: "/my-drive",
      component: () => import('@/views/MyDrive'),
      name: "My Drive",
    },
    {
      path: "/shared-with-me",
      component: () => import('@/views/SharedWithMe'),
      name: "Shared With Me",
    },
    {
      path: "/folders",
      component: () => import('@/views/Folders'),
      name: "Folders",
    },
    {
      path: "/last-update",
      component: () => import('@/views/LastUpdate'),
      name: "Last Update",
    },
    {
      path: "/search",
      component: () => import('@/views/Search'),
      name: "Search",
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
      path: "/q&a",
      component: QuestionAnswer,
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
  document.title = to.name;
  await store.dispatch("onFolderChange", to.query.id);
  next();
});

export default router;
