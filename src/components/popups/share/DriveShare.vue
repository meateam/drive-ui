<template>
  <div>
    <p id="choose">{{$t('share.DriveChoose')}}</p>
    <Autocomplete background="white" :placeholder="$t('autocomplete.Users')" />
  </div>
</template>

<script>
import Autocomplete from "@/components/inputs/Autocomplete";

export default {
  name: "DriveShare",
  components: { Autocomplete }
};
</script>

<style scoped>
#choose {
  font-size: 18px;
  padding-bottom: 15px;
}
</style>