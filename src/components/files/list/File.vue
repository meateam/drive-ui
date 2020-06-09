<template>
  <div id="file">
    <p id="file-name">{{file.name}}</p>
    <p>{{file.owner.fullName}}</p>

    <p>{{getFormatedDate()}}</p>
    <p v-if="!file.shared">{{$t('File.NotShare')}}</p>
    <!-- <UserAvatar v-else /> -->
  </div>
</template>

<script>
// import UserAvatar from "@/components/shared/UserAvatar";

export default {
  name: "ListFile",
  props: ["file",],
  // components: { UserAvatar },
  methods: {
    /**
     * getDate return the formated creation date
     */
    getFormatedDate() {
      const date = new Date(this.file.createdAt);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate() + 1;
      const hour = date.getHours();
      const minutes = date.getMinutes();

      return `${day}.${month}.${year} ${hour}:${minutes}`;
    }
  },
};
</script>

<style scoped>
#file {
  cursor: pointer;
  height: 70px;
  line-height: 70px;
  width: 100%;
  border-bottom: rgb(213, 221, 235) 1px solid;
  display: flex;
  justify-content: space-evenly;
}
p {
  text-align: right;
  color: #2c3448;
  font-size: 19px;
}
#file-name {
  font-size: 22px;
  direction: ltr;
}
#flex {
  display: flex;
}
</style>