<template>
  <v-col style="text-align: center">
    <v-row no-gutters justify="center">
      <v-col style="font-weight: bold" cols="12" sm="2" class="my-auto">
        {{ label }}
      </v-col>
      <v-col style="min-width: fit-content; max-width: 130px" cols="6" sm="5">
        <input max-width="170px" type="date" v-model="inputDate" />
      </v-col>
      <v-col style="min-width: fit-content; max-width: 130px" cols="4" sm="5">
        <input max-width="130px" type="time" v-model="inputTime" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pt-0 font-italic text-caption" cols="12">
        {{ formattedModelValue }}
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  computed: {
    formattedModelValue() {
      let res;
      if (this.modelValue) {
        res =
          this.logLocale.toUpperCase() +
          " formatted: " +
          this.modelValue.toLocaleString(this.logLocale, {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
      } else {
        res = "None ...";
      }
      return res;
    },
  },
  data() {
    return {
      inputDate: this.modelValue ? this.formatDate(this.modelValue) : "",
      inputTime: this.modelValue ? this.formatTime(this.modelValue) : "",
    };
  },
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Date,
      default: new Date().setSeconds(0, 0),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Select a DateTime",
    },
    logLocale: {
      type: String,
      default: "bg",
    },
  },
  watch: {
    modelValue(newValue) {
      if (newValue instanceof Date) {
        this.inputDate = this.formatDate(newValue);
        this.inputTime = this.formatTime(newValue);
      }
    },
    inputDate() {
      this.updateAndEmitDateTime();
    },
    inputTime() {
      this.updateAndEmitDateTime();
    },
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    formatTime(date) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    updateAndEmitDateTime() {
      const [year, month, day] = this.inputDate.split("-").map(Number);
      const [hours, minutes] = this.inputTime.split(":").map(Number);
      const updatedDateTime = new Date(
        year,
        month - 1,
        day,
        hours,
        minutes,
        0,
        0
      );
      this.$emit("update:modelValue", updatedDateTime);
    },
  },
};
</script>
<style scoped>
input {
  border-bottom: solid gray 1px;
}
input:hover {
  border-bottom: solid black 1px;
}
</style>
