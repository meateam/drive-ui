<template>
  <v-autocomplete
    v-model="item"
    @input="onSelect"
    @update:search-input="onInput"
    @keyup.enter.native="onEnter"
    no-filter
    :items="items"
    :loading="isLoading"
    rounded
    filled
    dense
    item-text="display"
    return-object
    :append-icon="icon"
    color="#035c64"
    :background-color="background"
    :placeholder="placeholder"
    :class="{ 'disableInput' : disabled }"
  >
    <template v-slot:no-data>
      <p id="no-result">{{ $t(`autocomplete.${ validationFailedMsg ? validationFailedMsg : noResult || 'NoResult'}`)}}</p>
    </template>
  </v-autocomplete>
</template>

<script>
import debounce from "lodash/debounce";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    item: null,
    value: "",
    validationFailedMsg: null,
  }),
  computed: {
    ...mapGetters(["error"])
  },
  props: [
    "placeholder",
    "items",
    "background",
    "icon",
    "isLoading",
    "minLength",
    "noResult",
    "disabled",
    "validation",
  ],
  methods: {
    onSelect() {
      this.$store.commit("setCurrentMailOrT", this.value);
      this.$emit("select", this.item);
    },
    onEnter() {
      this.item = "";
      this.$emit("enter", this.value);
    },
    onInput(value) {
      this.value = value;
      const validationMsg = this.validation && value && value.length > 1 ? this.validation(value) : null;
      if (!validationMsg) {
        this.validationFailedMsg = false;
        this.onSearch(value);
      } else {
        this.validationFailedMsg = validationMsg;
      }
    },
    onSearch: debounce(function(value) {
      if (typeof value === "string" && value.length >= this.minLength)
        this.$emit("type", value);
    }, 500)
  }
};
</script>

<style scoped>
#no-result {
  padding-right: 20px;
}
.disableInput {
  pointer-events: none;
}
</style>