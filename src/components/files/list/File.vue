<template>
  <div id="file">
    <p id="file-name">{{file.name}}</p>
    <p>{{getUserByID(file.ownerId)}}</p>

    <div id="flex">
      <p id="file-creation">{{getDate()}}</p>
      <p v-if="!file.shared">{{$t('File.NotShare')}}</p>
      <!-- <UserAvatar v-else /> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// import UserAvatar from "@/components/shared/UserAvatar";

export default {
  name: "ListFile",
  props: ["file"],
  // components: { UserAvatar },
  methods: {
    ...mapActions(["getUserByID"]),
    /**
     * getDate return the formated creation date
     */
    getDate() {
      console.log(this.file);
      const date = new Date(this.file.createdAt);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate() + 1;
      const hour = date.getHours();
      const minutes = date.getMinutes();

      return `${day}.${month}.${year} ${hour}:${minutes}`;
    }
  }
};
</script>

<style scoped>
#file {
  padding-right: 150px;
  cursor: pointer;
  height: 70px;
  width: 100%;
  border-bottom: rgb(213, 221, 235) 1px solid;
  display: flex;
}
p {
  margin-top: auto;
  margin-bottom: auto;
  text-align: right;
  color: #2c3448;
  font-size: 19px;
  font-family: Rubik-Light;
}
#file-name {
  font-size: 22px;
  direction: ltr;
  margin-left: 30%;
}
#file-creation {
  margin-left: 50px;
}
#flex {
  display: flex;
}
</style>