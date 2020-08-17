<template>
  <div class="page-container">
    <h1 id="page-name">{{$t('questions.Header')}}</h1>
    <ExpantionPannel :items="questions" />
  </div>
</template>

<script>
import ExpantionPannel from "@/components/shared/BaseExpantionPannel";

export default {
  name: "QuestionAnswer",
  components: { ExpantionPannel },
  data() {
    return {
      questions: Object.values(this.$t("questions.items"))
    };
  }
};
</script>

<style scoped>
#page-name {
  font-size: 40px;
  border-bottom: 2px solid #035c64;
  padding-bottom: 8px;
  color: #2c3448;
  font-family: Assistant-light;
  font-weight: 400;
  text-align: right;
  margin-bottom: 20px;
}
</style>