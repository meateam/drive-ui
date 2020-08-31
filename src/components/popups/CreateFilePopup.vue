<template>
  <v-dialog v-model="dialog" max-width="600" class="popup">
    <v-card>
      <div class="popup-header">
        <img class="popup-icon auto-margin" src="@/assets/icons/green-create-file.svg" />
        <p class="d-title">{{$t(`file.Create`)}}</p>
      </div>
      <div class="popup-body">
        <p class="d-subtitle">{{$t(`renameFile.Name`)}}</p>
        <TextField
          ref="input"
          @keyup.enter.native="onConfirm"
          @input="onNameChange"
          :placeholder="$t(`renameFile.New`)"
        />
        <p class="d-subtitle">{{$t(`file.Type`)}}</p>
        <v-item-group v-model="selectedType" mandatory>
          <v-container>
            <v-row>
              <v-col v-for="type in types" :key="type.src">
                <v-item v-slot:default="{ active, toggle }">
                  <div>
                    <img
                      id="type-image"
                      class="auto-margin pointer"
                      :src="require(`@/assets/file-types/${type.src}`)"
                      @click="toggle"
                    />
                    <v-scroll-y-transition>
                      <div class="align-center" v-if="active">
                        <v-icon>done</v-icon>
                      </div>
                    </v-scroll-y-transition>
                  </div>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
        <v-card-actions class="popup-confirm">
          <SubmitButton
            @click="onConfirm"
            :label="$t('buttons.Confirm')"
            :disabled="name.length < 2 || selectedType === null"
          />
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import TextField from "@/components/inputs/BaseTextField";
import SubmitButton from "@/components/buttons/BaseSubmitButton";

export default {
  name: "CreateFilePopup",
  components: { SubmitButton, TextField },
  data() {
    return {
      dialog: false,
      types: [
        {
          src: "word.svg",
          value: "docx",
        },
        {
          src: "excel.svg",
          value: "xlsx",
        },
        {
          src: "powerpoint.svg",
          value: "pptx",
        },
      ],
      name: "",
      selectedType: null,
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    onNameChange(name) {
      this.name = name;
    },
    onConfirm() {
      const type = this.types[this.selectedType].value;
      if (this.name.length >= 2) {
        this.$emit("confirm", this.name, type);
        this.dialog = false;
        this.$refs.input.clear();
        this.name = "";
      }
    },
  },
};
</script>

<style scoped>
#type-image {
  width: 80px;
  height: 80px;
}
</style>