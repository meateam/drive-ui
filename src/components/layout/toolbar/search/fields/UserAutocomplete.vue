<template>
  <v-autocomplete
    v-model="item"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    :background-color="background"
    :label="placeholder"
    :append-icon="icon"
    @input="onSelect"
    item-text="display"
    item-value="id"
    color="#035c64"
    clearable
    no-filter
    solo
    dense
    outlined
    flat
    :class="{ disableInput: disabled }"
  >
    <template v-slot:no-data>
      <p id="no-result">
        {{ $t(`autocomplete.${validationFailedMsg ? validationFailedMsg : noResult || "NoResult"}`) }}
      </p>
    </template>
  </v-autocomplete>
</template>

<script>
import debounce from "lodash/debounce";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    item: null,
    search: null,
    value: null,
    validationFailedMsg: null,
  }),
  computed: {
    ...mapGetters(["error"]),
  },
  props: ["placeholder", "items", "background", "icon", "isLoading", "minLength", "noResult", "disabled", "validation"],
  methods: {
    onSelect() {
      this.value = this.search;
      this.$store.commit("setCurrentMailOrT", this.search);
      this.$emit("select", this.item);
    },
    onInput() {
      if (!this.value || this.value === this.search) {
        const validationMsg =
          this.validation && this.search && this.search.length > 1 ? this.validation(this.search) : null;
        if (!validationMsg) {
          this.validationFailedMsg = false;
          this.onSearch(this.search);
        } else {
          this.validationFailedMsg = validationMsg;
        }
      }
    },
    onSearch: debounce(function(value) {
      if (typeof value === "string" && value.length >= this.minLength) this.$emit("type", value);
    }, 500),
  },
  watch: {
    search(val, oldval) {
      if (!val) this.$emit("clearItems");
      else if (val != oldval) this.onInput(val);
    },
  },
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
