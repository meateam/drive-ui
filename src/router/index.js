/* eslint-disable no-unused-vars */
import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import NotFound from "@/views/errors/404";
import Unavailable from "@/views/errors/503";
import MyDrive from "@/views/MyDrive";
import SharedWithMe from "@/views/SharedWithMe";
import Folders from "@/views/Folders";
import LastUpdate from "@/views/LastUpdate";
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
  if (to.name === "Shared With Me") {
    await store.dispatch("fetchSharedFiles");
  } else if (to.name === "Last Update") {
    await store.dispatch("fetchLastUpdatedFiles");
  } else {
    await store.dispatch("fetchFiles");
  }
  next();
});

export default router;
