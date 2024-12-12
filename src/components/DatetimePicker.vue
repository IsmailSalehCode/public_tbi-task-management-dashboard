<template>
  <div class="datetime-picker">
    <div class="datetime-inputs">
      <input type="date" v-model="dateInput" />
      <input type="time" v-model="timeInput" />
    </div>
    <div v-if="modelValue" class="datetime-display">
      {{ locale.toUpperCase() }} formatted: {{ formattedDateTime }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: [Number, Date],
  },
  emits: ["update:modelValue"],
  data() {
    return {
      dateInput: "",
      timeInput: "",
      locale: import.meta.env.VITE_LOCALE || "bg",
    };
  },
  computed: {
    formattedDateTime() {
      if (!this.modelValue) return "";
      const date = new Date(this.modelValue);
      return date.toLocaleString(this.locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(value) {
        if (value) {
          const date = new Date(value);
          this.dateInput = this.formatDate(date);
          this.timeInput = this.formatTime(date);
        }
      },
    },
    dateInput() {
      this.updateDateTime();
    },
    timeInput() {
      this.updateDateTime();
    },
  },
  methods: {
    formatDate(date) {
      return date.toISOString().split("T")[0];
    },
    formatTime(date) {
      return date.toTimeString().slice(0, 5);
    },
    updateDateTime() {
      if (!this.dateInput || !this.timeInput) return;

      const [year, month, day] = this.dateInput.split("-").map(Number);
      const [hours, minutes] = this.timeInput.split(":").map(Number);

      const newDateTime = new Date(year, month - 1, day, hours, minutes);
      this.$emit("update:modelValue", newDateTime.getTime());
    },
  },
};
</script>

<style scoped>
.datetime-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.datetime-inputs {
  display: flex;
  gap: 10px;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.datetime-display {
  color: #666;
  font-style: italic;
}
</style>
