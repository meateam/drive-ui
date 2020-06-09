/* eslint-disable no-unused-vars */
import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import NotFound from "@/views/errors/404"
import MyDrive from "@/views/MyDrive";
import SharedWithMe from "@/views/SharedWithMe";
import Folders from "@/views/Folders";
import LastUpload from "@/views/LastUpload";
import DeletedFiles from "@/views/DeletedFiles";

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
      name: 'My Drive',
    },
    {
      path: "/shared-with-me",
      component: SharedWithMe,
      name: 'Shared With Me',
    },
    {
      path: "/folders",
      component: Folders,
      name: 'Folders',
    },
    {
      path: "/last-upload",
      component: LastUpload,
      name: 'Last Upload',
    },    
    {
      path: "/deleted-files",
      component: DeletedFiles,
      name: 'Deleted Files',
    },
    {
      path: "/404",
      component: NotFound,
      name: 'Not Found',
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   console.log(store);
//   if (store.getters.isAuthenticated) return next();
//   store.dispatch("authenticate");
// });

export default router;
