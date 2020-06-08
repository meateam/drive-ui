import Vue from "vue";
import Router from "vue-router";
import MyDrive from "@/views/MyDrive";
import SharedWithMe from "@/views/SharedWithMe";
import Folders from "@/views/Folders";
import LastUpload from "@/views/LastUpload";
import DeletedFiles from "@/views/DeletedFiles";

Vue.use(Router);

const router = new Router({
  base: "",
  routes: [
    {
      path: "*",
      children: [
        {
          path: "/my-drive",
          component: MyDrive,
        },
        {
          path: "/shared-with-me",
          component: SharedWithMe,
        },
        {
          path: "/folders",
          component: Folders,
        },
        {
          path: "/last-upload",
          component: LastUpload,
        },
        {
          path: "/deleted-files",
          component: DeletedFiles,
        },
      ],
    },
  ],
});

export default router;
