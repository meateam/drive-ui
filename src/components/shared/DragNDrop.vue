<template>
  <div :class="{ onDrag }">
    <div v-if="onDrag" id="drop-description">
      <v-icon id="upload-icon">cloud_upload</v-icon>
      <p>{{ $t("buttons.UploadFile") }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getFilesFromDroppedItems } from "./../../utils/drop";

export default {
  name: "DragNDrop",
  data() {
    return {
      onDrag: false,
      dragCount: 0,
    };
  },
  computed: {
    ...mapGetters(["currentFolder"]),
  },
  methods: {
    getFilesFromDroppedItems,
    isFileDrag(event) {
      if (event.dataTransfer.types) {
        for (let i = 0; i < event.dataTransfer.types.length; i++) {
          if (event.dataTransfer.types[i] == "Files") {
            return true;
          }
        }
      }
      return false;
    },
    dragInit() {
      window.addEventListener(
        "dragenter",
        (event) => {
          event.preventDefault();
          this.dragCount += 1;
        },
        false
      );
      window.addEventListener(
        "dragleave",
        (event) => {
          event.preventDefault();
          this.dragCount -= 1;
          if (this.isFileDrag(event) && !this.dragCount) {
            this.onDrag = false;
          }
        },
        false
      );
      window.addEventListener(
        "dragover",
        (event) => {
          event.preventDefault();
          if (this.isFileDrag(event)) {
            this.onDrag = true;
          }
        },
        false
      );
      window.addEventListener(
        "drop",
        async (event) => {
          event.preventDefault();

          if (this.isFileDrag(event)) {
            this.onDrag = false;

            await this.getFilesFromDroppedItems(event.dataTransfer, (data) => {
              // return new Promise(() => {
                console.log(data)
                for (let i = 0; i < 10; i++) {
                  console.log(i)
                }
                //resolve(true);
              // })
            });


            // let folderByPath = { "": undefined };
            // const rootFolder = this.currentFolder;
            // let mainFolder = null;

            // const res = await this.getFilesFromDroppedItems(event.dataTransfer);
            // for (const r of res) {
            //   let data = await r;
            //   // upload file without a folder
            //   if (!data.key) {
            //     await this.$store.dispatch("uploadFiles", data.files);
            //     return;
            //   }
            //   let path = "";
            //   let folders = data.key.split("/");
            //   // set folder to root
            //   await this.$store.commit("setCurrentFolder", rootFolder);
            //   for (const folder of folders) {
            //     if (folder == "") {
            //       continue;
            //     }
            //     path += "/" + folder;
            //     if (!folderByPath[path]) {
            //       // upload a new folder and set tue currentFolder to the new folder
            //       await this.$store.dispatch("uploadFolderRecursive", folder);
            //       folderByPath[path] = this.currentFolder;
            //       if (!mainFolder) {
            //         mainFolder = this.currentFolder;
            //       }
            //     } else {
            //       await this.$store.commit(
            //         "setCurrentFolder",
            //         folderByPath[path]
            //       );
            //     }
            //   }
            //   await this.$store.commit(
            //     "setCurrentFolder",
            //     folderByPath[data.key]
            //   );
            //   await this.$store.dispatch("uploadFilesToFolder", data.files);
            // }
            // // set folder to root
            // await this.$store.commit("setCurrentFolder", rootFolder);
            // await this.$store.commit("addFile", mainFolder);
            // await this.$store.commit("onSuccess", "success.Folder");
            
          }
        },
        false
      );
    },
  },
  created() {
    this.dragInit();
  },
};
</script>

<style scoped>
.onDrag {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
#upload-icon {
  color: #035c64;
  display: block;
  font-size: 250px;
}
#drop-description {
  display: block;
  margin: auto;
  margin-top: 15%;
  text-align: center;
  font-size: 30px;
}
</style>